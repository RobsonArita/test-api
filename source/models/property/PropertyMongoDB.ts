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
  title: String,
  address: String,
  image: [Types.ObjectId],
  evaluateSituation: {
    type: String,
    enum: PropertyEvaluateSituationValues
  },
  visible: Boolean,
  isAlocated: Boolean,
  value: Number
}
const Property = new Schema(PropertySchema, { timestamps: true })
Property.plugin(aggregatePaginate)

const PropertyMongoDB = mongoose.model<IPropertyDocument, IPropertyModel>('Property', Property)
export const PropertyRepositoryImp = new PropertyRepository(PropertyMongoDB)

export default PropertyMongoDB


