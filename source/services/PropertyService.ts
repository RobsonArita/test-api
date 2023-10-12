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

  async create (userId: Types.ObjectId, property: ICreateProperty): Promise<void> {

  }
}

export interface ICreateProperty {
  address: string
  description: string
}