export type Token = string;

/**
 * Scans kayfabe source code and returns an array of tokens.
 * @param source The source code to scan
 * @returns An array of token
 */
export function scanTokens(source: string): Array<Token> {
  return Array.from(source.split('\n'));
}
