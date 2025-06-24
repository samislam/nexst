import { runCommand } from './run-command'
import { executeSequentially } from './execute-sequentially'

/**
 * Runs multiple commands sequentially, similar to the behaviour of && on linux systems, but works
 * cross-platform. This utility is based on the `runCommand` utility function, which streams the
 * stdio as well as the stderr to the stdout of the parent process (i.e it's set to inherit).
 */
export const runCommandsSequentially = (commands: string[], printCommands = false) => {
  return executeSequentially(commands.map((command) => () => runCommand(command, printCommands)))
}
