import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async (): Promise<void> => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI || '')

    console.log(
      colors.cyan.bold(`DB connected: ${connection.host}:${connection.port}`)
    )
  } catch (error) {
    console.error(colors.bgRed.white.bold(`Error connecting to DB, ${error}`))
    process.exit(1)
  }
}
