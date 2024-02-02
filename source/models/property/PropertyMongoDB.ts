import mongoose, { Schema, type Document, type Model, SchemaDefinition, Types } from 'mongoose'
import { IProperty, PropertyEvaluateSituationValues } from './PropertyModel'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { PropertyRepository } from './PropertyRepository'
import { IAggregatePaginate } from '../MongoPaginate'

export interface IPropertyDocument extends Document, Omit<IProperty, '_id'> {}
export interface IPropertyModel extends Model<IPropertyDocument> {
  aggregatePaginate: IAggregatePaginate<IProperty>
}

const PropertySchema: SchemaDefinition = {
  creatorId: Types.ObjectId,
  description: String,
  address: String,
  image: String,
  evaluateSituation: {
    type: String,
    enum: PropertyEvaluateSituationValues
  },
  visible: Boolean,
  isAlocated: Boolean
}
const Property = new Schema(PropertySchema)
Property.plugin(aggregatePaginate)

const PropertyMongoDB = mongoose.model<IPropertyDocument, IPropertyModel>('Property', Property)
export const PropertyRepositoryImp = new PropertyRepository(PropertyMongoDB)

export default PropertyMongoDB


