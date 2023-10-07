import http from 'http'

export const initializeServer = (app: http.Server) => {
  try {
    const port = process.env.PORT
    const ip = process.env.IP

    if (!port) configurationExitResponse('port')
    if (!ip) configurationExitResponse('ip')

    // @ts-ignore
    app.listen(port, ip)
    console.info('Server was successfully initialized!')
  } catch (err) {
    console.warn('Error at initializing server!', err)
  }
}

const configurationExitResponse = (type: string) => {
  console.warn(`Error initializing server: ${type} not configured`)
  process.exit(1)
}