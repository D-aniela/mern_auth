import mongoose from 'mongoose'

export interface IUser {
  handle: string
  name: string
  email: string
  password: string
  unique: true
}

const UserSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
})

const User = mongoose.model<IUser>('User', UserSchema)
export default User
