import { Types } from 'mongoose'
import MongoModel from '../MongoModel'

export enum UserLevel {
  proprietario = 'proprietario',
  locatario = 'locatario',
  admin = 'admin'
}
export const UserLevelValues = Object.values(UserLevel)

export interface IUser {
  _id?: Types.ObjectId
  name?: string
  email?: string
  level?: UserLevel
  cellphone?: string
  password?: string
}

export class UserModel extends MongoModel<IUser> {
  private readonly _name: IUser['name']
  private readonly _email: IUser['email']
  private readonly _level: IUser['level']
  private readonly _cellphone: IUser['cellphone']
  private readonly _password: IUser['password']

  constructor (user: Partial<IUser>) {
    super(user)

    this._id = user._id
    this._name = user.name
    this._email = user.email
    this._level = user.level
    this._cellphone = user.cellphone
    this._password = user.password
  }

  get object (): Partial<IUser> {
    return {
      name: this._name,
      email: this._email,
      level: this._level,
      cellphone: this._cellphone,
      password: this._password
    }
  }

  get saveDB (): Partial<IUser> {
    return { ...this.object }
  }
}