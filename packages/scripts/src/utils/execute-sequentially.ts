type AsyncTask = (...args: unknown[]) => Promise<unknown>

export const executeSequentially = async (promises: AsyncTask[]) => {
  for (const promise of promises) {
    try {
      await promise()
    } catch (error: unknown) {
      console.error(`Execution stopped due to error: ${(error as Error)?.message}`)
      break
    }
  }
}
