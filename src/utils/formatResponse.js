// Utility function to clean up AI responses with proper structure preservation
export function formatAIResponse(text) {
  if (!text) return text;
  
  let formatted = text;
  
  // Remove markdown bold formatting (**text**) but preserve the text
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '$1');
  
  // Remove other markdown formatting
  formatted = formatted.replace(/\*(.*?)\*/g, '$1'); // Remove italic
  formatted = formatted.replace(/`(.*?)`/g, '$1'); // Remove code blocks
  
  // Handle bullet points and lists
  // Convert markdown-style lists to proper HTML-like structure
  formatted = formatted.replace(/^\s*\*\s+/gm, '• '); // Convert * to bullet
  formatted = formatted.replace(/^\s*-\s+/gm, '• '); // Convert - to bullet
  
  // Handle numbered lists
  formatted = formatted.replace(/^\s*(\d+)\.\s+/gm, '$1. '); // Preserve numbered lists
  
  // Handle sub-bullets (indented)
  formatted = formatted.replace(/^\s{2,}\*\s+/gm, '  • '); // Sub-bullets
  formatted = formatted.replace(/^\s{2,}-\s+/gm, '  • '); // Sub-bullets with dash
  
  // Clean up extra whitespace but preserve paragraph breaks
  formatted = formatted.replace(/\n\s*\n/g, '\n\n'); // Preserve paragraph breaks
  formatted = formatted.replace(/\n{3,}/g, '\n\n'); // Limit consecutive line breaks
  
  // Add proper spacing around bullet points
  formatted = formatted.replace(/([^\n])\n•/g, '$1\n\n•'); // Add space before bullets
  formatted = formatted.replace(/•\n([^\n])/g, '•\n\n$1'); // Add space after bullet sections
  
  // Clean up the final result
  formatted = formatted.trim();
  
  return formatted;
} 