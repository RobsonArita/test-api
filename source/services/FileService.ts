import { customResponse } from '../middleware'
import { FileRepositoryImp } from '../models/file/FileMongoDB'
import { Types } from 'mongoose'
import { FileModel, IFile } from '../models/file/FileModel'
import { MulterFile } from '../../types/express'

export class FileService {
  private readonly fileRepository: typeof FileRepositoryImp

  constructor (
    fileRepository: typeof FileRepositoryImp
  ) {
    this.fileRepository = fileRepository
  }

  async create (userId: string, file?: any): Promise<IFile> {
    if (!file) throw customResponse.send_expectationFailed('Ocorreu um erro ao importar arquivo!', { erro: 'kek' })

    const model = new FileModel({
      creatorId: new Types.ObjectId(userId),
      url: file?.location
    })
    const createdFile = await this.fileRepository.create(model)

    return { ...createdFile.object, _id: createdFile._id }
  }
}
