import mongoose from 'mongoose'
import colors from 'colors'

export const initializeDatabase = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL as string
    await mongoose.connect(databaseUrl, {})
    const infoMessage = colors.cyan('Database was succesfully initialized!')
    console.info(infoMessage)
  } catch (err) {
    const infoErr = colors.red('There was an error when initializing database connection')
    console.warn(infoErr, err)
  }
}