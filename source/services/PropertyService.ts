import { PropertyRepositoryImp } from '../models/property/PropertyMongoDB'
import { UserRepositoryImp } from '../models/user/UserMongoDB'

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

  async create (): Promise<void> {

  }
}

export interface ICreateProperty {
  
}