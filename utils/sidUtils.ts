/**
 * Generates a random hexadecimal string of specified length
 */
function generateRandomHex(length: number): string {
  const characters = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generates a SID in the format {prefix}{16 random hex characters}
 */
export function generateSid(prefix: string): string {
  return `${prefix}${generateRandomHex(16)}`;
}
