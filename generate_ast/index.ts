const args = Bun.argv.slice(2);
const outputFilename = 'astTypes.generated.ts';

if (args.length != 1) {
  printUsage();
  process.exit(64);
} else {
  const outputDirectory = args[0];

  const outputFile = `${outputDirectory}/${outputFilename}`;
  console.log(`Parsing into ${outputFile}`);

  defineAst(outputFile, 'Expr', [
    'Match            => matchActions: Array<PerformedAction>',
    'PerformedAction  => actors: Array<Actor>, action: Action, reaction?: Reaction',
    'Reaction         => actors: Array<Actor>, action: Action',
    'Action           => actionIdentifier: string',
    'Actor            => actorIdentifier: string',
  ]);
}

function printUsage() {
  console.log('Usage: bun run ast <output-directory>');
}

function defineAst(
  outputPath: string,
  baseName: string,
  types: Array<string>
): void {
  let output = `export class ${baseName} { constructor() {} };\n`;
  output += '\n';

  for (const type of types) {
    const [typeName, paramsAsList] = type
      .split('=>')
      .map((element) => element.trim());

    const paramTuples = paramsAsList.split(',').map((element) => {
      const [name, type] = element.split(':');
      return [name.trim(), type.trim()];
    });

    const paramsDeclarations = paramTuples
      .map(([name, type]) => `\t${name}: ${type};\n`)
      .join('');

    const paramsAssignments = paramTuples
      .map(([name]) => name.replace('?', ''))
      .map((param) => `\t\tthis.${param} = ${param};\n`)
      .join('');

    output += `export class ${typeName} extends ${baseName} {\n`;
    output += paramsDeclarations;
    output += '\n';
    output += `\tconstructor(${paramsAsList}) {\n`;
    output += `\t\tsuper();\n`;
    output += paramsAssignments;
    output += '\t}\n';

    output += '}\n';
    output += '\n';
  }

  output = output.slice(0, -1); // Trim the trailing newline

  Bun.write(outputPath, output);
}
