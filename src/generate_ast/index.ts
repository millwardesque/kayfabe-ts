const args = Bun.argv.slice(2);

if (args.length != 1) {
  printUsage();
  process.exit(64);
} else {
  const outputDirectory = args[0];
  console.log(`Parsing into ${outputDirectory}`);
}

function printUsage() {
  console.log('Usage: bun run ast <output-directory>');
}
