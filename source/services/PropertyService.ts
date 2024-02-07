import { customResponse } from '../middleware'
import { IPaginateResult } from '../models/MongoPaginate'
import { FileRepositoryImp } from '../models/file/FileMongoDB'
import { IProperty, PropertyEvaluateSituation, PropertyModel } from '../models/property/PropertyModel'
import { PropertyRepositoryImp } from '../models/property/PropertyMongoDB'
import { IListPropertyParams } from '../models/property/PropertyRepository'
import { UserRepositoryImp } from '../models/user/UserMongoDB'
import { Types } from 'mongoose'

export class PropertyService {
  private readonly userRepository: typeof UserRepositoryImp
  private readonly propertyRepository: typeof PropertyRepositoryImp
  private readonly fileRepository: typeof FileRepositoryImp

  constructor (
    userRepository: typeof UserRepositoryImp,
    propertyRepository: typeof PropertyRepositoryImp,
    fileRepository: typeof FileRepositoryImp
  ) {
    this.userRepository = userRepository
    this.propertyRepository = propertyRepository
    this.fileRepository = fileRepository
  }

  async list (filters: IListPropertyParams, userId?: string): Promise<IPaginateResult<IProperty>> {
    const paginated = await this.propertyRepository.list(filters, userId)
    const formatedDocs = await Promise.all(paginated?.docs?.map(async (property) => {
      if (!property.image?.length) return property
      const urls = await this.fetchFilesUrls(property.image)
      return { ...property, image: urls }
    }))

    // @ts-ignore
    return { ...paginated, docs: formatedDocs }
  }

  private async fetchFilesUrls (fileIds: Array<Types.ObjectId>) {
    const urls = (await Promise.all(fileIds.map(async (fileId) => {
      return await this.fileRepository.fetchUrlById(fileId)
    }))).filter(url => url !== null)

    return urls
  }

  async create (userId: string, property: ICreateProperty): Promise<void> {
    const creator = await this.userRepository.findById(new Types.ObjectId(userId))
    if (!creator) throw customResponse.send_notFound('Usuário não encontrado!', { userId })

    const toObjectIdImage = property.image?.map(im => new Types.ObjectId(im))
    await this.propertyRepository.create(new PropertyModel({
      address: property.address,
      creatorId: creator._id,
      description: property.description,
      evaluateSituation: PropertyEvaluateSituation.analisys,
      image: toObjectIdImage,
      title: property.title,
      isAlocated: false,
      visible: false,
      value: property.value
    }))
  }

  async detail (propertyId: string) {
    const property = (await this.propertyRepository.findById(propertyId))?.object
    if (property?.image) {
      const urls = await this.fetchFilesUrls(property.image)
      //@ts-ignore
      property.image = urls
    }
    return property
  }
}

export interface ICreateProperty {
  address: string
  description: string
  title: string
  image: Array<Types.ObjectId>
  value: number
}