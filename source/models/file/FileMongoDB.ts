import mongoose, { Schema, type Document, type Model, SchemaDefinition, Types } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { IAggregatePaginate } from '../MongoPaginate'
import { IFile } from './FileModel'
import { FileRepository } from './FileRepository'

export interface IFileDocument extends Document, Omit<IFile, '_id'> {}
export interface IFileMongoDB extends Model<IFileDocument> {
  aggregatePaginate: IAggregatePaginate<IFile>
}

const FileSchema: SchemaDefinition = {
  creatorId: Types.ObjectId,
  url: String
}
const File = new Schema(FileSchema, { timestamps: true })
File.plugin(aggregatePaginate)

const FileMongoDB = mongoose.model<IFileDocument, IFileMongoDB>('File', File)
export const FileRepositoryImp = new FileRepository(FileMongoDB)

export default FileMongoDB


