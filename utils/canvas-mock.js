// Mock canvas module for Cloudflare Workers environment
// This replaces the canvas package that konva tries to use in Node.js

// Create mock canvas functionality
export const createCanvas = () => ({
  getContext: () => ({
    fillRect: () => {},
    clearRect: () => {},
    getImageData: () => ({ data: [] }),
    putImageData: () => {},
    createImageData: () => ({ data: [] }),
    setTransform: () => {},
    drawImage: () => {},
    save: () => {},
    restore: () => {},
    translate: () => {},
    scale: () => {},
    rotate: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    fill: () => {},
    arc: () => {},
    rect: () => {},
    closePath: () => {},
  }),
  width: 0,
  height: 0,
  toBuffer: () => Buffer.alloc(0),
  toDataURL: () => 'data:image/png;base64,',
});

export const loadImage = () => Promise.resolve({
  width: 0,
  height: 0,
  naturalWidth: 0,
  naturalHeight: 0,
});

export const registerFont = () => {};

// Default export for compatibility
const canvasMock = {
  createCanvas,
  loadImage,
  registerFont,
};

export default canvasMock;

// For environments that expect global canvas
if (typeof globalThis !== 'undefined') {
  globalThis.createCanvas = createCanvas;
  globalThis.loadImage = loadImage;
  globalThis.registerFont = registerFont;
}
