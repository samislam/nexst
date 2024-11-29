import { URL } from 'url'

export function formatUrl(host: string, port: number) {
  host = host.toLowerCase()

  if (!host.startsWith('http://') && !host.startsWith('https://')) {
    host = `http://${host}`
  }

  const url = new URL(host)
  url.port = port.toString()

  return url.href
}
