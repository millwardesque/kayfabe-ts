export class ErrorReporter {
  hadError = false;

  public error(line: number, message: string): void {
    this.report(line, '', message);
  }

  report(line: number, location: string, message: string) {
    console.error(`[line ${line}] Error ${location}: ${message}`);
    this.hadError = true;
  }
}
