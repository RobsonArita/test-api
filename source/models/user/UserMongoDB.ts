import mongoose, { Schema, type Document, type Model } from 'mongoose'
import { IUser, UserLevelValues } from './UserModel'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { UserRepository } from './UserRepository'

export interface IUserDocument extends Document, Omit<IUser, '_id'> {}
export interface IUserModel extends Model<IUserDocument> {}

const User = new Schema({
  name: String,
  email: String,
  level: {
    type: String,
    enum: UserLevelValues
  },
  cellphone: String,
  password: String
})

User.plugin(aggregatePaginate)
const UserMongoDB = mongoose.model<IUserDocument, IUserModel>('User', User)

export const UserRepositoryImp = new UserRepository(UserMongoDB)

export default UserMongoDB