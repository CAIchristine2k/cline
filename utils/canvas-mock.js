// Mock canvas module for Cloudflare Workers environment
// This replaces the canvas package that konva tries to use in Node.js

export default {};

// Export empty functions for any canvas functionality
export const createCanvas = () => ({});
export const loadImage = () => Promise.resolve({});
export const registerFont = () => {};

// Make it compatible with both ESM and CommonJS
module.exports = {};
module.exports.createCanvas = createCanvas;
module.exports.loadImage = loadImage;
module.exports.registerFont = registerFont;
