/**
 * PlatformDetector.js
 * Detects the current platform (desktop, mobile, or web)
 */

// Platform types
export const PLATFORM = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
  WEB: 'web'
};

// Operating system types
export const OS = {
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  IOS: 'ios',
  ANDROID: 'android',
  UNKNOWN: 'unknown'
};

/**
 * Platform information type
 * @typedef {Object} PlatformInfo
 * @property {string} platform - The platform type (desktop, mobile, web)
 * @property {string} os - The operating system
 * @property {boolean} isDesktop - Whether the platform is desktop
 * @property {boolean} isMobile - Whether the platform is mobile
 * @property {boolean} isWeb - Whether the platform is web
 * @property {boolean} isWindows - Whether the OS is Windows
 * @property {boolean} isMacOS - Whether the OS is macOS
 * @property {boolean} isLinux - Whether the OS is Linux
 * @property {boolean} isIOS - Whether the OS is iOS
 * @property {boolean} isAndroid - Whether the OS is Android
 */

/**
 * Detect the current platform
 * @returns {PlatformInfo} Platform information
 */
export function detectPlatform() {
  // Default to web platform
  let platform = PLATFORM.WEB;
  let os = OS.UNKNOWN;
  
  // Check if running in Node.js environment
  const isNode = typeof process !== 'undefined' && 
                 process.versions != null && 
                 process.versions.node != null;
  
  // Check if running in NativeScript environment
  // @ts-ignore - NativeScript global object
  const isNativeScript = typeof global !== 'undefined' && 
                         // @ts-ignore - NativeScript runtime version
                         typeof global.__runtimeVersion !== 'undefined' && 
                         // @ts-ignore - NativeScript runtime version
                         String(global.__runtimeVersion).indexOf('NativeScript') !== -1;
  
  // Check if running in NodeGUI environment
  const isNodeGUI = isNode && 
                    typeof process.versions.qt !== 'undefined';
  
  // Determine platform based on environment
  if (isNativeScript) {
    platform = PLATFORM.MOBILE;
    
    // Determine mobile OS
    // @ts-ignore - NativeScript android global
    if (typeof global !== 'undefined' && typeof global.android !== 'undefined') {
      os = OS.ANDROID;
    // @ts-ignore - NativeScript ios global
    } else if (typeof global !== 'undefined' && typeof global.ios !== 'undefined') {
      os = OS.IOS;
    }
  } else if (isNodeGUI || isNode) {
    platform = PLATFORM.DESKTOP;
    
    // Determine desktop OS
    if (process.platform === 'win32') {
      os = OS.WINDOWS;
    } else if (process.platform === 'darwin') {
      os = OS.MACOS;
    } else if (process.platform === 'linux') {
      os = OS.LINUX;
    }
  } else {
    // Web platform - detect OS from user agent
    const userAgent = typeof navigator !== 'undefined' ? 
                      (navigator.userAgent || '') : '';
    const vendor = typeof navigator !== 'undefined' ? 
                   (navigator.vendor || '') : '';
    // @ts-ignore - Opera browser
    const opera = typeof window !== 'undefined' && 
                  // @ts-ignore - Opera browser
                  typeof window.opera !== 'undefined' ? 
                  // @ts-ignore - Opera browser
                  window.opera : '';
    
    const ua = userAgent || vendor || opera || '';
    
    if (/windows/i.test(ua)) {
      os = OS.WINDOWS;
    } else if (/macintosh|mac os x/i.test(ua)) {
      os = OS.MACOS;
    } else if (/linux/i.test(ua)) {
      os = OS.LINUX;
    } else if (/android/i.test(ua)) {
      os = OS.ANDROID;
    } else if (/iphone|ipad|ipod/i.test(ua)) {
      os = OS.IOS;
    }
    
    // Check if mobile browser
    const isMobileBrowser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    if (isMobileBrowser) {
      platform = PLATFORM.MOBILE;
    }
  }
  
  return {
    platform,
    os,
    isDesktop: platform === PLATFORM.DESKTOP,
    isMobile: platform === PLATFORM.MOBILE,
    isWeb: platform === PLATFORM.WEB,
    isWindows: os === OS.WINDOWS,
    isMacOS: os === OS.MACOS,
    isLinux: os === OS.LINUX,
    isIOS: os === OS.IOS,
    isAndroid: os === OS.ANDROID
  };
}

// Get platform information once and cache it
/** @type {PlatformInfo} */
const platformInfo = detectPlatform();

// Export platform detection functions
export function isDesktop() {
  return platformInfo.isDesktop;
}

export function isMobile() {
  return platformInfo.isMobile;
}

export function isWeb() {
  return platformInfo.isWeb;
}

export function detectOS() {
  return platformInfo.os;
}

/**
 * Get platform information
 * @returns {Object} Platform information
 */
export function getPlatformInfo() {
  return {
    ...platformInfo,
    // Add additional information
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    nodeVersion: typeof process !== 'undefined' ? process.version : null,
    qtVersion: typeof process !== 'undefined' && process.versions ? process.versions.qt : null,
    // @ts-ignore - NativeScript runtime version
    nativeScriptVersion: typeof global !== 'undefined' && 
                         // @ts-ignore - NativeScript runtime version
                         typeof global.__runtimeVersion !== 'undefined' ? 
                         // @ts-ignore - NativeScript runtime version
                         global.__runtimeVersion : null,
    timestamp: new Date().toISOString()
  };
}

// Export all functions
export default {
  PLATFORM,
  OS,
  detectPlatform,
  getPlatformInfo,
  isDesktop,
  isMobile,
  isWeb,
  detectOS
};