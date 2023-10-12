import mongoose, { Schema, type Document, type Model, SchemaDefinition } from 'mongoose'
import { IProperty, PropertyEvaluateSituationValues } from './PropertyModel'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { PropertyRepository } from './PropertyRepository'

export interface IPropertyDocument extends Document, Omit<IProperty, '_id'> {}
export interface IPropertyModel extends Model<IPropertyDocument> {}

const PropertySchema: SchemaDefinition = {
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


