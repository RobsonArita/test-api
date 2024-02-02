import { IPaginateResult } from '../MongoPaginate'
import { IProperty, PropertyModel } from './PropertyModel'
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

  async list (filters?: IListPropertyParams): Promise<IPaginateResult<IProperty>> {
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

export interface IListPropertyParams {
  page?: number
  limit?: number
  sort?: string
}