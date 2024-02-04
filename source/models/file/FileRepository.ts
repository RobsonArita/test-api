import { IPaginateResult } from '../MongoPaginate'
import { FileModel, IFile } from './FileModel'
import { IFileMongoDB } from './FileMongoDB'
import { Types } from 'mongoose'
 
export class FileRepository {
  private readonly mongoDB: IFileMongoDB
  constructor (mongoDB: IFileMongoDB) {
    this.mongoDB = mongoDB
  }

  async create (file: FileModel): Promise<FileModel> {
    file._id = new Types.ObjectId
    const createdFile = await this.mongoDB.create(file.saveDB)
    createdFile._id = file._id
    return new FileModel(createdFile)
  }

  async list (filters?: IDefaultListParams): Promise<IPaginateResult<IFile>> {
    return await this.mongoDB.aggregatePaginate(
      this.mongoDB.aggregate([{ $match: {} }]),
      {
        page: Number(filters?.page) ?? 1,
        limit: Number(filters?.limit) ?? 10,
        sort: filters?.sort?.toString() ?? '-createdAt'
      }
    )
  }
}

export interface IDefaultListParams {
  page?: number
  limit?: number
  sort?: string
}