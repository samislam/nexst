/** A class for generating Node.js commands to print styled text to the terminal. */

export class Echo {
  constructor(private text: string) {}

  /** Generates a Node.js executable command to print the styled text. */
  get command(): string {
    // Escape quotes and newlines to ensure compatibility in shell
    const escapedText = this.text.replace(/"/g, '\\"').replace(/\n/g, '\\n')
    return `node -e "console.log('${escapedText}')"`
  }
}
