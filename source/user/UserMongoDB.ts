import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  name: string
  email: string
}

const userSchema = new Schema({
  name: String,
  email: String,
})

const User = mongoose.model<IUser>('User', userSchema)
export default User