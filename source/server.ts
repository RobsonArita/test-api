import http from 'http'
import colors from 'colors'

export const initializeServer = (server: http.Server) => {
  try {
    const port = process.env.PORT
    const ip = process.env.IP

    if (!port) configurationExitResponse('port')
    if (!ip) configurationExitResponse('ip')

    // @ts-ignore
    server.listen(port, ip)
    const consoleMessage = colors.cyan('Server was successfully initialized!')
    console.info(consoleMessage)
  } catch (err) {
    const consoleMessage = colors.red('Error at initializing server!')
    console.warn(consoleMessage, err)
  }
}

const configurationExitResponse = (type: string) => {
  console.warn(`Error initializing server: ${type} not configured`)
  process.exit(1)
}