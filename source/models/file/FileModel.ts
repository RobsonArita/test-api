import { Types } from 'mongoose'
import MongoModel from '../MongoModel'

export interface IFile {
  _id?: Types.ObjectId
  creatorId: Types.ObjectId
  url: string
}

export class FileModel extends MongoModel<IFile> {
  private readonly _creatorId: IFile['creatorId']
  private readonly _url: IFile['url']

  constructor (file: IFile) {
    super(file)
    this._creatorId = file.creatorId
    this._url = file.url
  }

  get object (): IFile {
    return {
      creatorId: this._creatorId,
      url: this._url
    }
  }

  get saveDB (): IFile {
    return this.object
  }
}