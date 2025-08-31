/**
 * Creates a canvas-based image with a title and background color
 * @param title - The full title to display (e.g., 'Arrays', 'Linked Lists')
 * @param bgColor - Background color in hex format (e.g., '#22c55e')
 * @param textColor - Text color in hex format (default: '#FFFFFF')
 * @param size - Canvas size in pixels (default: 400)
 * @returns Data URL string representing the generated image
 */
export function createTitleImage(
  title: string, 
  bgColor: string, 
  textColor: string = '#FFFFFF', 
  size: number = 400
): string {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get 2D context from canvas');
  }

  // Set canvas dimensions
  canvas.width = size;
  canvas.height = size;

  // Fill background with the specified color
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Configure text properties
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Add text shadow for better visibility
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Split title into words for multi-line display
  const words = title.split(' ');
  
  if (words.length === 1) {
    // Single word - use larger font
    const fontSize = title.length > 8 ? size * 0.15 : size * 0.2;
    ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
    ctx.fillText(title.toUpperCase(), size / 2, size / 2);
  } else {
    // Multiple words - split into lines
    const fontSize = size * 0.12;
    ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
    
    const lineHeight = fontSize * 1.2;
    const totalHeight = words.length * lineHeight;
    const startY = (size - totalHeight) / 2 + lineHeight / 2;
    
    words.forEach((word, index) => {
      const y = startY + (index * lineHeight);
      ctx.fillText(word.toUpperCase(), size / 2, y);
    });
  }

  // Return the canvas as a data URL
  return canvas.toDataURL('image/png');
}

/**
 * Gets the appropriate initial letter for a data structure category
 * @param title - The category title (e.g., 'Arrays', 'Linked Lists')
 * @returns The initial letter to use
 */
export function getCategoryInitial(title: string): string {
  const specialCases: { [key: string]: string } = {
    'Basics': 'B',
    'Arrays': 'A',
    'Stacks': 'S',
    'Queues': 'Q',
    'Linked Lists': 'LL',
    'Strings': 'Str',
    'Bit Manipulation': 'BM',
    'Sliding Window': 'SW',
    'Graphs': 'G',
    'Binary Trees': 'BT',
    'Dynamic Programming': 'DP'
  };

  return specialCases[title] || title.charAt(0).toUpperCase();
}

/**
 * Creates a canvas-based image with an initial letter and background color
 * @param initial - The letter to display (e.g., 'A' for Arrays)
 * @param bgColor - Background color in hex format (e.g., '#22c55e')
 * @param textColor - Text color in hex format (default: '#FFFFFF')
 * @param size - Canvas size in pixels (default: 400)
 * @returns Data URL string representing the generated image
 */
export function createInitialImage(
  initial: string, 
  bgColor: string, 
  textColor: string = '#FFFFFF', 
  size: number = 400
): string {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get 2D context from canvas');
  }

  // Set canvas dimensions
  canvas.width = size;
  canvas.height = size;

  // Fill background with the specified color
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  // Configure text properties
  const fontSize = initial.length > 2 ? size * 0.25 : size * 0.5; // Smaller font for longer initials
  ctx.fillStyle = textColor;
  ctx.font = `bold ${fontSize}px Inter, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Add text shadow for better visibility
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Draw the initial letter in the center
  ctx.fillText(initial.toUpperCase(), size / 2, size / 2);

  // Return the canvas as a data URL
  return canvas.toDataURL('image/png');
}