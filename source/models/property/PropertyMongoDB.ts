import mongoose, { Schema, type Document, type Model, SchemaDefinition } from 'mongoose'
import { IProperty, PropertyEvaluateSituationValues } from './PropertyModel'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

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
export default PropertyMongoDB


