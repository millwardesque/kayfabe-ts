import type { ErrorReporter } from './ErrorReporter';
import type { Literal, Token, TokenType } from './types';

const KEYWORD_TO_TOKENTYPE = new Map<string, TokenType>([
  ['action', 'ACTION'],
  ['actor', 'ACTOR'],
  ['match', 'MATCH'],
  ['sequence', 'SEQUENCE'],
]);

export class Scanner {
  errorReporter: ErrorReporter;
  source: string;
  tokens = new Array<Token>();

  startChar = 0;
  currentChar = 0;
  currentLine = 1;

  constructor(source: string, errorReporter: ErrorReporter) {
    this.errorReporter = errorReporter;
    this.source = source;
  }

  /**
   * Scans kayfabe source code and returns an array of tokens.
   * @param source The source code to scan.
   * @returns An array of tokens.
   */
  public scanTokens(): Array<Token> {
    while (!this.isAtEnd()) {
      this.startChar = this.currentChar;
      this.scanToken();
    }

    this.tokens.push({
      type: 'EOF',
      lexeme: '',
      literal: null,
      line: this.currentLine,
    });
    return this.tokens;
  }

  scanToken(): void {
    const char = this.advance();
    switch (char) {
      case ',':
        this.addToken('COMMA');
        break;
      case '.':
        this.addToken('DOT');
        break;
      case '#':
        while (this.peek() != '\n' && !this.isAtEnd()) {
          this.advance();
        }
        break;
      case '=':
        if (this.match('>')) {
          this.addToken('PERFORM_ON');
        } else {
          this.reportUnexpectedCharacter(char);
        }
        break;
      case '(':
        this.addToken('LEFT_PAREN');
        break;
      case ')':
        this.addToken('RIGHT_PAREN');
        break;

      // Ignore whitespace.
      case ' ':
      case '\r':
      case '\t':
        break;

      case '\n':
        this.currentLine++;
        break;

      default:
        if (this.isAlpha(char)) {
          this.identifier();
        } else {
          this.reportUnexpectedCharacter(char);
        }
        break;
    }
  }

  reportUnexpectedCharacter(char: string) {
    this.errorReporter.error(
      this.currentLine,
      `Unexpecected character: ${char}`
    );
  }

  advance(): string {
    const char = this.source.charAt(this.currentChar);
    this.currentChar++;

    return char;
  }

  addToken(tokenType: TokenType): void {
    this.addTokenWithLiteral(tokenType, null);
  }

  addTokenWithLiteral(tokenType: TokenType, literal: Literal) {
    const lexeme = this.source.substring(this.startChar, this.currentChar);
    this.tokens.push({
      type: tokenType,
      lexeme,
      literal,
      line: this.currentLine,
    });
  }

  identifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const keyword = this.source.substring(this.startChar, this.currentChar);
    const keywordTokenType = KEYWORD_TO_TOKENTYPE.get(keyword);
    if (keywordTokenType) {
      this.addToken(keywordTokenType);
    } else {
      this.addToken('IDENTIFIER');
    }
  }

  isAlpha(char: string): boolean {
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
  }

  isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }

  isAtEnd(): boolean {
    return this.currentChar >= this.source.length;
  }

  isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  match(expected: string): boolean {
    if (this.isAtEnd()) {
      return false;
    } else if (this.source.charAt(this.currentChar) != expected) {
      return false;
    } else {
      this.currentChar++;
      return true;
    }
  }

  peek(): string {
    if (this.isAtEnd()) {
      return '\0';
    }

    return this.source.charAt(this.currentChar);
  }
}
