import { NextFunction, Request, Response, Router } from 'express'
import { customResponse } from '../../middleware'
import upload from '../../multer'
import { FileService } from '../../services/FileService'
import { FileRepositoryImp } from '../../models/file/FileMongoDB'

const FileController = Router()

export const FileServiceImp = new FileService(
  FileRepositoryImp
)

FileController.post('/upload', upload.single('file'), async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { file, userId } = request
    const created = await FileServiceImp.create(userId, file)
    console.log({ created })
    return customResponse.send_ok('Arquivo importado com sucesso!', { file: created, _id: created._id })
    return customResponse.send_ok('Arquivo importado com sucesso!', {  _id: 'mocked_id' })
  } catch (err) {
    console.log({ err })
    return next(err)
  }
})

export default FileController