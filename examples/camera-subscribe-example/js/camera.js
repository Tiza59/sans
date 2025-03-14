/**
 * Camera functionality for Sans UI example app
 * Demonstrates how to access and use the device camera
 * with native permissions handling through Sans UI
 * Updated to use Sans UI components and the component abstraction layer
 */

class CameraManager {
  constructor() {
    // DOM elements
    this.videoElement = document.getElementById('camera-feed');
    this.canvasElement = document.getElementById('camera-canvas');
    this.photosGallery = document.getElementById('photos-gallery');
    
    // Get Sans UI button elements
    this.startButton = document.querySelector('sans-button#start-camera').getElement();
    this.takePhotoButton = document.querySelector('sans-button#take-photo').getElement();
    this.switchCameraButton = document.querySelector('sans-button#switch-camera').getElement();
    
    // Camera state
    this.stream = null;
    this.facingMode = 'user'; // 'user' for front camera, 'environment' for back camera
    this.photosTaken = [];
    
    // Bind methods
    this.startCamera = this.startCamera.bind(this);
    this.stopCamera = this.stopCamera.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    
    // Initialize event listeners
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Add event listeners to Sans UI button elements
    this.startButton.addEventListener('click', this.startCamera);
    this.takePhotoButton.addEventListener('click', this.takePhoto);
    this.switchCameraButton.addEventListener('click', this.switchCamera);
    
    // Handle page visibility changes to manage camera resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.stream) {
        this.stopCamera();
      }
    });
  }
  
  async startCamera() {
    try {
      // Check if Sans UI bridge is available for native camera permissions
      if (window.bridge && typeof window.bridge.requestPermission === 'function') {
        const permissionGranted = await window.bridge.requestPermission('camera');
        if (!permissionGranted) {
          throw new Error('Camera permission denied');
        }
      }
      
      // Get camera stream
      const constraints = {
        video: {
          facingMode: this.facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.stream;
      
      // Enable buttons
      this.takePhotoButton.disabled = false;
      this.switchCameraButton.disabled = false;
      this.startButton.textContent = 'Stop Camera';
      this.startButton.removeEventListener('click', this.startCamera);
      this.startButton.addEventListener('click', this.stopCamera);
      
      // Show notification if bridge is available
      if (window.bridge && typeof window.bridge.showNotification === 'function') {
        window.bridge.showNotification({
          title: 'Camera Active',
          text: 'The camera is now active and ready to take photos.',
          iconName: 'camera-photo'
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      this.showError(`Could not access camera: ${error.message}`);
    }
  }
  
  stopCamera() {
    if (this.stream) {
      // Stop all tracks
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.videoElement.srcObject = null;
      
      // Reset buttons
      this.takePhotoButton.disabled = true;
      this.switchCameraButton.disabled = true;
      this.startButton.textContent = 'Start Camera';
      this.startButton.removeEventListener('click', this.stopCamera);
      this.startButton.addEventListener('click', this.startCamera);
    }
  }
  
  takePhoto() {
    if (!this.stream) return;
    
    const context = this.canvasElement.getContext('2d');
    const width = this.videoElement.videoWidth;
    const height = this.videoElement.videoHeight;
    
    // Set canvas dimensions to match video
    this.canvasElement.width = width;
    this.canvasElement.height = height;
    
    // Draw video frame to canvas
    context.drawImage(this.videoElement, 0, 0, width, height);
    
    // Get image data URL
    const imageDataUrl = this.canvasElement.toDataURL('image/png');
    this.photosTaken.push(imageDataUrl);
    
    // Add to gallery
    this.addPhotoToGallery(imageDataUrl);
    
    // Play camera shutter sound if available through bridge
    if (window.bridge && typeof window.bridge.playSound === 'function') {
      window.bridge.playSound('camera-shutter');
    }
  }
  
  addPhotoToGallery(imageUrl) {
    const photoElement = document.createElement('img');
    photoElement.src = imageUrl;
    photoElement.className = 'photo-item';
    photoElement.alt = 'Captured photo';
    photoElement.addEventListener('click', () => this.viewPhoto(imageUrl));
    
    this.photosGallery.appendChild(photoElement);
  }
  
  viewPhoto(imageUrl) {
    // If native file saving is available through bridge
    if (window.bridge && typeof window.bridge.openFileDialog === 'function') {
      window.bridge.openFileDialog({
        title: 'Save Photo',
        saveDialog: true,
        filter: 'Images (*.png)'
      }).then(filePath => {
        if (filePath) {
          // Save the image using bridge
          if (typeof window.bridge.saveFile === 'function') {
            // Convert data URL to blob
            const byteString = atob(imageUrl.split(',')[1]);
            const mimeString = imageUrl.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            
            // Save file
            window.bridge.saveFile(filePath, blob);
          }
        }
      });
    } else {
      // Fallback for web: open in new tab
      window.open(imageUrl, '_blank');
    }
  }
  
  async switchCamera() {
    // Toggle facing mode
    this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
    
    // Restart camera with new facing mode
    this.stopCamera();
    await this.startCamera();
  }
  
  showError(message) {
    // Show error using native notification if available
    if (window.bridge && typeof window.bridge.showNotification === 'function') {
      window.bridge.showNotification({
        title: 'Camera Error',
        text: message,
        iconName: 'dialog-error'
      });
    } else {
      // Fallback to alert
      alert(`Camera Error: ${message}`);
    }
  }
}

// Initialize camera manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.cameraManager = new CameraManager();
});
