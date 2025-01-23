export type Literal = {} | null;

export type Token = {
  // Type of token.
  type: TokenType;

  // The lexeme of the token.
  lexeme: string;

  // The line on which the token was read.
  line: number;

  // The literal value of the token.
  literal: Literal;
};

export type TokenType =
  // Single-character tokens.
  | 'COLON'
  | 'COMMA'
  | 'DOT'
  | 'HASH'
  | 'LEFT_PAREN'
  | 'RIGHT_PAREN'

  // Dual-character tokens.
  | 'PERFORM_ON'

  // Literals.
  | 'IDENTIFIER'

  // Keywords.
  | 'ACTION'
  | 'ACTOR'
  | 'MATCH'
  | 'SEQUENCE'
  | 'EOF';
