import { customResponse } from '../middleware'
import { PropertyEvaluateSituation, PropertyModel } from '../models/property/PropertyModel'
import { PropertyRepositoryImp } from '../models/property/PropertyMongoDB'
import { UserRepositoryImp } from '../models/user/UserMongoDB'
import { Types } from 'mongoose'

export class PropertyService {
  private readonly userRepository: typeof UserRepositoryImp
  private readonly propertyRepository: typeof PropertyRepositoryImp

  constructor (
    userRepository: typeof UserRepositoryImp,
    propertyRepository: typeof PropertyRepositoryImp
  ) {
    this.userRepository = userRepository
    this.propertyRepository = propertyRepository
  }

  async create (userId: string, property: ICreateProperty): Promise<void> {
    const creator = await this.userRepository.findById(new Types.ObjectId(userId))
    if (!creator) throw customResponse.send_notFound('Usuário não encontrado!', { userId })

    await this.propertyRepository.create(new PropertyModel({
      address: property.address,
      creatorId: creator._id,
      description: property.description,
      evaluateSituation: PropertyEvaluateSituation.analisys,
      isAlocated: false,
      visible: false
    }))
  }
}

export interface ICreateProperty {
  address: string
  description: string
}