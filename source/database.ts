import mongoose from 'mongoose'

export const initializeDatabase = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL as string
    await mongoose.connect(databaseUrl, {})
    console.info('Database was succesfully initialized!')
  } catch (err) {
    console.warn('There was an error when initializing database connection', err)
  }
}