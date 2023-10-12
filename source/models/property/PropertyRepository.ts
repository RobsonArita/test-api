import { PropertyModel } from './PropertyModel'
import { IPropertyModel } from './PropertyMongoDB'

export class PropertyRepository {
  private readonly mongoDB: IPropertyModel
  constructor (mongoDB: IPropertyModel) {
    this.mongoDB = mongoDB
  }

  async create (property: PropertyModel): Promise<PropertyModel> {
    const createdProperty = await this.mongoDB.create(property.saveDB)
    return new PropertyModel(createdProperty)
  }
}