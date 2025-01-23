import * as fs from 'fs';
import { scanTokens } from './src/scanner';
import { ErrorReporter } from './src/ErrorReporter';
import { error } from 'console';

const args = Bun.argv.slice(2);
const errorReporter = new ErrorReporter();

if (args.length > 1) {
  printUsage();
} else if (args.length === 1) {
  await runFile(args[0].trim());
} else {
  await runPrompt();
}

/**
 * Prints the usage instructions for ts-kayfabe
 */
function printUsage(): void {
  console.log('Usage: bun run index.ts [script]');
}

/**
 * Runs a kayfabe script stored in a file.
 * @param filePath The path to the script
 */
async function runFile(filePath: string): Promise<void> {
  console.log(`Running script at ${filePath}`);

  let script: string = '';
  try {
    const file = Bun.file(filePath);
    script = await file.text();
  } catch (error) {
    console.error(`Error loading source file at ${filePath}: ${error}`);
    process.exit(1);
  }

  runScript(script);

  if (errorReporter.hadError) {
    process.exit(1);
  }
}

/**
 * Interactive kayfabe prompt.
 */
async function runPrompt(): Promise<void> {
  const prompt = '> ';
  process.stdout.write(prompt);
  for await (const line of console) {
    runScript(line);
    process.stdout.write(prompt);

    // Reset the hadError status after each invocation so that one bad line doesn't break the interpreter
    errorReporter.hadError = false;
  }
}

/**
 * Runs a kayfabe script in a string
 * @param script The script stored as a string.
 */
function runScript(script: string): void {
  const tokens = scanTokens(script);
  console.log(tokens);
}
