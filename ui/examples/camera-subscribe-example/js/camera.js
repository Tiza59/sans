/**
 * Camera Module
 * Handles camera access and photo capture
 */

let stream = null;
let video = null;
let canvas = null;
let photo = null;

/**
 * Initialize the camera
 * @returns {Promise<void>}
 */
export async function initCamera() {
  // Get DOM elements
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  photo = document.getElementById('photo');
  
  // Show video element
  video.style.display = 'block';
  document.getElementById('camera-placeholder').style.display = 'none';
  
  try {
    // Request camera with lower resolution to avoid permission issues
    // and improve compatibility across browsers
    const constraints = {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
      },
      audio: false
    };
    
    // Request camera access with proper error handling
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    // Set video source
    if ('srcObject' in video) {
      video.srcObject = stream;
    } else {
      // Fallback for older browsers
      video.src = window.URL.createObjectURL(stream);
    }
    
    // Wait for video to be ready
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        resolve();
      };
    });
  } catch (error) {
    console.error('Error accessing camera:', error);
    
    // Provide more helpful error messages
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      throw new Error('Camera access denied. Please grant permission to use your camera.');
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      throw new Error('No camera found. Please connect a camera and try again.');
    } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      throw new Error('Camera is in use by another application. Please close other applications using the camera.');
    } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
      throw new Error('Camera does not meet the required constraints. Try a different camera.');
    } else {
      throw new Error(`Camera error: ${error.message}`);
    }
  }
}

/**
 * Take a photo from the camera
 * @returns {string} The data URL of the captured photo
 */
export function takePhoto() {
  if (!video || !canvas || !photo) {
    throw new Error('Camera not initialized');
  }
  
  // Draw video frame to canvas
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Get image data URL
  const dataUrl = canvas.toDataURL('image/png');
  
  // Set photo source
  photo.src = dataUrl;
  
  return dataUrl;
}

/**
 * Stop the camera
 */
export function stopCamera() {
  if (!stream) {
    throw new Error('Camera not started');
  }
  
  // Stop all tracks
  stream.getTracks().forEach(track => track.stop());
  
  // Reset video source
  if (video) {
    video.srcObject = null;
    video.style.display = 'none';
    document.getElementById('camera-placeholder').style.display = 'block';
  }
  
  // Reset stream
  stream = null;
}

/**
 * Check if the browser supports camera access
 * @returns {boolean} True if camera is supported
 */
export function isCameraSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Export all functions
export default {
  initCamera,
  takePhoto,
  stopCamera,
  isCameraSupported
};
