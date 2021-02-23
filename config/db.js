import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected to ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error.red.underline.bold)
  }
}
