/**
 * Professional Image Processing Service for Fingerprint Tracing
 * Uses Adaptive Thresholding and High-Pass filtering for forensic-grade extraction.
 */

// Helper to load image
export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
};

// Convert to Grayscale
const applyGrayscale = (data: Uint8ClampedArray) => {
  for (let i = 0; i < data.length; i += 4) {
    // Luminance formula
    const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = avg;     // R
    data[i + 1] = avg; // G
    data[i + 2] = avg; // B
  }
};

// Contrast Stretching (Normalization)
const applyContrastStretching = (data: Uint8ClampedArray) => {
  let min = 255;
  let max = 0;

  // Find min and max luminance
  for (let i = 0; i < data.length; i += 4) {
    const val = data[i];
    if (val < min) min = val;
    if (val > max) max = val;
  }

  // Avoid division by zero
  if (max === min) return;

  const scale = 255 / (max - min);

  // Apply stretch
  for (let i = 0; i < data.length; i += 4) {
    const val = data[i];
    const newVal = (val - min) * scale;
    data[i] = newVal;
    data[i + 1] = newVal;
    data[i + 2] = newVal;
  }
};

// Fast Box Blur (Approximate Local Mean)
// A true Gaussian is expensive for large radii. A multi-pass box blur approximates Gaussian well enough for thresholding.
const applyBoxBlur = (data: Uint8ClampedArray, width: number, height: number, radius: number) => {
  const tempData = new Uint8ClampedArray(data);
  const size = width * height * 4;
  
  // Horizontal pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;
      
      for (let k = -radius; k <= radius; k++) {
        const px = Math.min(width - 1, Math.max(0, x + k));
        const idx = (y * width + px) * 4;
        sum += tempData[idx]; // Only need one channel since it's grayscale
        count++;
      }
      
      const targetIdx = (y * width + x) * 4;
      const avg = sum / count;
      data[targetIdx] = avg;
      data[targetIdx + 1] = avg;
      data[targetIdx + 2] = avg;
    }
  }

  // Copy back for vertical pass
  tempData.set(data);

  // Vertical pass
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let count = 0;
      
      for (let k = -radius; k <= radius; k++) {
        const py = Math.min(height - 1, Math.max(0, y + k));
        const idx = (py * width + x) * 4;
        sum += tempData[idx];
        count++;
      }
      
      const targetIdx = (y * width + x) * 4;
      const avg = sum / count;
      data[targetIdx] = avg;
      data[targetIdx + 1] = avg;
      data[targetIdx + 2] = avg;
    }
  }
};

// Adaptive Thresholding
// Compare pixel to local mean. If pixel < mean - offset, it's a "dark" detail (ridge/valley).
const applyAdaptiveThreshold = (data: Uint8ClampedArray, blurredData: Uint8ClampedArray, offset: number = 5) => {
  for (let i = 0; i < data.length; i += 4) {
    const originalVal = data[i];
    const localMean = blurredData[i];
    
    // If the original pixel is significantly darker than its surroundings (local mean),
    // it's likely part of a ridge (assuming ridges are dark on skin, or shadows).
    // For fingerprints on paper, ridges are black (low value). 
    // For photos of hands, ridges cast shadows or are darker than skin tone highlights.
    
    // Logic: If (Original < LocalMean - Offset) -> Black (Ridge), Else White (Background)
    if (originalVal < (localMean - offset)) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    } else {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
    data[i + 3] = 255; // Full opacity
  }
};

export const processFingerprint = async (imageUrl: string): Promise<string> => {
  const image = await loadImage(imageUrl);
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Performance optimization: limit max dimension
  const MAX_DIM = 1024;
  let width = image.width;
  let height = image.height;
  
  if (width > MAX_DIM || height > MAX_DIM) {
    const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  canvas.width = width;
  canvas.height = height;

  // 1. Draw Original
  ctx.drawImage(image, 0, 0, width, height);
  const originalImageData = ctx.getImageData(0, 0, width, height);
  const data = originalImageData.data;

  // 2. Grayscale & Contrast
  applyGrayscale(data);
  applyContrastStretching(data);

  // 3. Create a copy for calculating local mean
  const blurredData = new Uint8ClampedArray(data);
  
  // 4. Calculate Local Mean using Box Blur
  // Radius ~10-15 works well for fingerprints at 1000px resolution
  applyBoxBlur(blurredData, width, height, 12); 

  // 5. Apply Adaptive Thresholding
  // Compare the Grayscale+Contrast data against the Blurred data
  applyAdaptiveThreshold(data, blurredData, 4);

  // Put data back
  ctx.putImageData(originalImageData, 0, 0);

  return canvas.toDataURL('image/png');
};