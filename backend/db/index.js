import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        const connectInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected DB host ! ${connectInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection failed", error.message)
    }
}

export default connectDB