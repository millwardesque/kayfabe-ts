import * as fs from 'fs';

const args = Bun.argv.slice(2);

if (args.length > 1) {
  printUsage();
} else if (args.length === 1) {
  runFile(args[0].trim());
} else {
  runPrompt();
}

/**
 * Runs a kayfabe script stored in a file.
 * @param filePath The path to the script
 */
function runFile(filePath: string): void {
  console.log(`Running script at ${filePath}`);
  const script = fs.readFileSync(filePath, 'utf-8');
  runScript(script);
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
  }
}

/**
 * Runs a kayfabe script in a string
 * @param script The script stored as a string.
 */
function runScript(script: string): void {
  console.log(script);
}

/**
 * Prints the usage instructions for ts-kayfabe
 */
function printUsage(): void {
  console.log('Usage: bun run index.ts [script]');
}
