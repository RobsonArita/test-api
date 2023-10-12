import { QueryOptions, Types } from 'mongoose'

import { IUser, UserModel } from './UserModel'
import { IUserModel } from './UserMongoDB'

export class UserRepository {
  private readonly mongoDB: IUserModel & { aggregatePaginate?: any }
  constructor (mongoDB: IUserModel) {
    this.mongoDB = mongoDB
  }

  async findById (id: Types.ObjectId): Promise<UserModel | null> {
    const user = await this.mongoDB.findById(id)
    if (!user) return null

    return new UserModel(user)
  }

  async create (user: UserModel): Promise<UserModel> {
    const createdUser = await this.mongoDB.create(user.saveDB)
    return new UserModel(createdUser)
  }

  async find (query): Promise<Array<UserModel>> {
    const users = await this.mongoDB.find(query)

    const models = (users || []).map(
      (document) => new UserModel(document)
    )

    return models
  }

  async findOne (query): Promise<UserModel | null> {
    const user = await this.mongoDB.findOne(query)
    if (!user) return null

    return new UserModel(user)
  }

  async exists (query): Promise<Types.ObjectId | null> {
    const user = await this.mongoDB.exists(query)

    return user?._id
  }

  async updateOne (user: UserModel, options?: QueryOptions): Promise<void> {
    const userObject = user.saveDB
    const update: { $set: Partial<IUser> } = { $set: {} }

    if (userObject.email) update.$set.email = userObject.email
    if (userObject.cellphone) update.$set.cellphone = userObject.cellphone

    await this.mongoDB.updateOne({ _id: userObject._id }, update, options)
  }

  async setPassword (_id: Types.ObjectId, criptedPassword: string): Promise<void> {
    await this.mongoDB.updateOne({ _id }, { password: criptedPassword })
  }
}