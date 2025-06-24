import { spawn } from 'child_process'

/**
 * Runs a given command in the shell asyncronously and directly prints the stdio as the parent
 * process
 */
export const runCommand = (command: string, printCommand = true) =>
  new Promise((resolve, reject) => {
    if (printCommand) console.log(command)
    const [cmd, ...args] = command.split(' ')
    const process = spawn(cmd, args, { stdio: 'inherit', shell: true })

    process.on('close', (code) => {
      if (code === 0) {
        resolve(true)
      } else {
        reject(new Error(`Command "${command}" failed with exit code ${code}`))
      }
    })
  })
