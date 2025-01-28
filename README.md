# ts-kayfabe

A TypeScript parser for the Kayfabe language, a domain-specific language for consisely describing the events that occur in a professional wrestling match.

# Installation

First, install dependencies

```bash
bun install
```

Next, generate the AST types file in the ./src/ directory

```bash
bun run ast ./src/
```

# Running

To run as a REPL:

```bash
bun run index.ts
```

To run against a file:

```bash
bun run index.ts </path/to/file>
```
