import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import dotenv from 'dotenv';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

// Initialize Mailgun
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

// Initialize Supabase client
let supabase;
if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  try {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
    console.log('Supabase client initialized');
  } catch (error) {
    console.error('Supabase initialization error:', error);
  }
}

// Create Elysia app
const app = new Elysia()
  .use(cors())
  .get('/', () => {
    return { message: 'Sans UI Backend API Example' };
  })
  
  // Health check endpoint
  .get('/health', () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  })
  
  // Subscribe endpoint
  .post('/subscribe', async ({ body }) => {
    try {
      // Validate request body
      const { name, email, consent } = body;
      
      if (!name || !email) {
        return { success: false, message: 'Name and email are required' };
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, message: 'Invalid email format' };
      }
      
      // Store subscriber in Supabase if available
      if (supabase) {
        try {
          // Check if email already exists
          const { data: existingSubscriber } = await supabase
            .from(process.env.SUPABASE_TABLE || 'subscribers')
            .select('email')
            .eq('email', email)
            .maybeSingle();
          
          if (existingSubscriber) {
            return { success: false, message: 'Email already subscribed' };
          }
          
          // Insert new subscriber
          const { error: insertError } = await supabase
            .from(process.env.SUPABASE_TABLE || 'subscribers')
            .insert({
              name,
              email,
              consent: consent === true || consent === 'true',
              created_at: new Date().toISOString()
            });
          
          if (insertError) {
            console.error('Supabase insert error:', insertError);
            // Continue with email sending even if DB fails
          } else {
            console.log(`Subscriber saved to Supabase: ${email}`);
          }
        } catch (dbError) {
          console.error('Supabase error:', dbError);
          // Continue with email sending even if DB fails
        }
      } else {
        console.log('Supabase not available, skipping database storage');
        console.log('New subscriber:', { name, email, consent });
      }
      
      // Send welcome email via Mailgun
      if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
        try {
          const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: process.env.EMAIL_FROM || `Sans UI <noreply@${process.env.MAILGUN_DOMAIN}>`,
            to: email,
            subject: 'Welcome to Sans UI Waitlist',
            text: `Hello ${name},\n\nThank you for subscribing to the Sans UI waitlist! We'll keep you updated on our progress and notify you when new features are available.\n\nBest regards,\nThe Sans UI Team`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #41CD52;">Welcome to Sans UI!</h2>
                <p>Hello ${name},</p>
                <p>Thank you for subscribing to the Sans UI waitlist! We're excited to have you join us.</p>
                <p>We'll keep you updated on our progress and notify you when new features are available.</p>
                <div style="margin: 30px 0; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
                  <h3 style="color: #3584e4;">What is Sans UI?</h3>
                  <p>Sans UI is a cross-platform native UI library that supports iOS, Android, Windows, macOS, Linux, Qt, and GTK.</p>
                  <p>Learn more at our <a href="https://github.com/profullstack/sans-ui" style="color: #41CD52;">GitHub repository</a>.</p>
                </div>
                <p>Best regards,<br>The Sans UI Team</p>
              </div>
            `,
          });
          
          console.log('Email sent:', result);
        } catch (emailError) {
          console.error('Mailgun error:', emailError);
          // Continue and return success even if email fails
          // In production, you might want to handle this differently
        }
      } else {
        console.log('Mailgun not configured, skipping email');
      }
      
      return { success: true, message: 'Subscription successful' };
      
    } catch (error) {
      console.error('Subscription error:', error);
      return { success: false, message: 'An error occurred during subscription' };
    }
  })
  
  // Get subscribers endpoint (protected by API key)
  .get('/subscribers', async ({ headers, query }) => {
    // Simple API key check
    if (headers.authorization !== `Bearer ${process.env.API_KEY}`) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    if (!supabase) {
      return { message: 'Supabase not available', subscribers: [] };
    }
    
    try {
      // Build query with filters
      let supabaseQuery = supabase
        .from(process.env.SUPABASE_TABLE || 'subscribers')
        .select('*');
      
      // Apply filters if provided
      if (query.search) {
        supabaseQuery = supabaseQuery.or(`name.ilike.%${query.search}%,email.ilike.%${query.search}%`);
      }
      
      if (query.consent === 'true' || query.consent === 'false') {
        supabaseQuery = supabaseQuery.eq('consent', query.consent === 'true');
      }
      
      // Apply pagination
      const page = parseInt(query.page) || 1;
      const pageSize = parseInt(query.pageSize) || 20;
      const start = (page - 1) * pageSize;
      
      // Get total count for pagination
      const { count: totalCount, error: countError } = await supabase
        .from(process.env.SUPABASE_TABLE || 'subscribers')
        .select('*', { count: 'exact', head: true });
        
      if (countError) {
        throw countError;
      }
      
      // Execute query with pagination and ordering
      const { data: subscribers, error } = await supabaseQuery
        .order('created_at', { ascending: false })
        .range(start, start + pageSize - 1);
      
      if (error) {
        throw error;
      }
      
      return { 
        success: true,
        count: subscribers.length, 
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        subscribers 
      };
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      return { success: false, message: 'Error fetching subscribers' };
    }
  })
  
  // Get subscriber by ID (protected by API key)
  .get('/subscribers/:id', async ({ headers, params }) => {
    // Simple API key check
    if (headers.authorization !== `Bearer ${process.env.API_KEY}`) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    if (!supabase) {
      return { message: 'Supabase not available' };
    }
    
    try {
      const { data: subscriber, error } = await supabase
        .from(process.env.SUPABASE_TABLE || 'subscribers')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return new Response('Subscriber not found', { status: 404 });
        }
        throw error;
      }
      
      return { success: true, subscriber };
    } catch (error) {
      console.error(`Error fetching subscriber ${params.id}:`, error);
      return { success: false, message: 'Error fetching subscriber' };
    }
  })
  
  // Delete subscriber (protected by API key)
  .delete('/subscribers/:id', async ({ headers, params }) => {
    // Simple API key check
    if (headers.authorization !== `Bearer ${process.env.API_KEY}`) {
      return new Response('Unauthorized', { status: 401 });
    }
    
    if (!supabase) {
      return { message: 'Supabase not available' };
    }
    
    try {
      const { error } = await supabase
        .from(process.env.SUPABASE_TABLE || 'subscribers')
        .delete()
        .eq('id', params.id);
      
      if (error) {
        throw error;
      }
      
      return { success: true, message: 'Subscriber deleted successfully' };
    } catch (error) {
      console.error(`Error deleting subscriber ${params.id}:`, error);
      return { success: false, message: 'Error deleting subscriber' };
    }
  })
  
  // Start the server
  .listen(process.env.PORT || 3001);

console.log(`🚀 Sans UI Backend running at ${app.server?.hostname}:${app.server?.port}`);
