/**
 * Review Helpers - Utilities for managing testimonials/reviews
 * Provides deterministic functions for name formatting and photo assignment
 */

/**
 * List of all available review photos from /images/avis/
 * Order is deterministic to ensure consistent photo assignment
 */
const REVIEW_PHOTOS = [
  '/images/avis/IMG_6439.jpg',
  '/images/avis/IMG_6441.jpg',
  '/images/avis/IMG_6460.jpg',
  '/images/avis/IMG_6462.jpg',
  '/images/avis/IMG_6463.jpg',
  '/images/avis/IMG_6464.jpg',
  '/images/avis/IMG_6465.jpg',
  '/images/avis/IMG_6466.jpg',
  '/images/avis/IMG_6467.jpg',
  '/images/avis/IMG_6468.jpg',
  '/images/avis/IMG_6469.jpg',
  '/images/avis/IMG_6470.jpg',
  '/images/avis/IMG_6471.jpg',
  '/images/avis/IMG_6472.jpg',
  '/images/avis/IMG_6473.jpg',
  '/images/avis/IMG_6474.jpg',
  '/images/avis/IMG_6475.jpg',
  '/images/avis/IMG_6476.jpg',
  '/images/avis/IMG_6477.jpg',
  '/images/avis/IMG_6478.jpg',
  '/images/avis/IMG_7333.JPG',
  '/images/avis/IMG_7334.JPG',
  '/images/avis/IMG_7335.JPG',
  '/images/avis/IMG_7336.JPG',
  '/images/avis/IMG_7337.JPG',
  '/images/avis/IMG_7338.JPG',
  '/images/avis/IMG_7339.JPG',
  '/images/avis/IMG_7340.JPG',
  '/images/avis/IMG_7343.JPG',
  '/images/avis/IMG_7344.JPG',
  '/images/avis/IMG_7345.JPG',
  '/images/avis/IMG_7346.JPG',
  '/images/avis/IMG_7349.JPG',
  '/images/avis/IMG_7350.WEBP',
  '/images/avis/IMG_7351.WEBP',
];

/**
 * Possible last name initials for generating formatted names
 */
const LAST_NAME_INITIALS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

/**
 * Formats a review name to "FirstName X." format
 * Extracts first name and generates a deterministic last name initial
 *
 * @param fullName - The original name (can be "FirstName LastName" or "FirstName X.")
 * @param index - Index/ID of the review for deterministic initial generation
 * @returns Formatted name like "Sophie M." or "Fatou K."
 *
 * @example
 * formatReviewName("Sophie Martin", 1) // "Sophie M."
 * formatReviewName("Fatou D.", 2) // "Fatou D."
 * formatReviewName("Yasmine Khalil", 3) // "Yasmine K."
 */
export function formatReviewName(fullName: string, index: number): string {
  // Split the name into parts
  const nameParts = fullName.trim().split(/\s+/);

  // Always use the first part as the first name
  const firstName = nameParts[0];

  // Check if the second part is already an initial (single letter followed by optional period)
  const secondPart = nameParts[1];
  let lastInitial: string;

  if (secondPart && /^[A-Z]\.?$/.test(secondPart)) {
    // Already an initial, use it (remove any existing period)
    lastInitial = secondPart.replace('.', '');
  } else if (secondPart) {
    // It's a full last name, take first letter
    lastInitial = secondPart.charAt(0).toUpperCase();
  } else {
    // No second part, generate deterministic initial based on index
    lastInitial = LAST_NAME_INITIALS[index % LAST_NAME_INITIALS.length];
  }

  return `${firstName} ${lastInitial}.`;
}

/**
 * Gets a deterministic photo for a review based on its index
 * Ensures each photo is used once before repeating
 * Prevents hydration mismatches by being deterministic
 *
 * @param index - Index or ID of the review (must be consistent)
 * @returns Path to review photo
 *
 * @example
 * getReviewPhoto(0) // '/images/avis/IMG_6439.jpg'
 * getReviewPhoto(1) // '/images/avis/IMG_6441.jpg'
 * getReviewPhoto(35) // '/images/avis/IMG_7351.WEBP'
 * getReviewPhoto(36) // '/images/avis/IMG_6439.jpg' (cycles back)
 */
export function getReviewPhoto(index: number): string {
  // Use modulo to cycle through photos when we run out
  const photoIndex = index % REVIEW_PHOTOS.length;
  return REVIEW_PHOTOS[photoIndex];
}

/**
 * Gets a deterministic rating for a review
 * Alternates between 4.5 and 5.0 based on index
 *
 * @param index - Index or ID of the review
 * @returns Rating value (4.5 or 5.0)
 *
 * @example
 * getReviewRating(0) // 5.0
 * getReviewRating(1) // 4.5
 * getReviewRating(2) // 5.0
 */
export function getReviewRating(index: number): number {
  // Alternate between 5.0 and 4.5
  // Even indices get 5.0, odd indices get 4.5
  return index % 2 === 0 ? 5.0 : 4.5;
}

/**
 * Gets the total number of available review photos
 * Useful for knowing when photos will start repeating
 */
export function getTotalReviewPhotos(): number {
  return REVIEW_PHOTOS.length;
}
