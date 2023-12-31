import { Types } from 'mongoose'
import MongoModel from "../MongoModel"

export enum PropertyEvaluateSituation {
  approved = 'approved',
  reproved = 'reproved',
  analisys = 'analisys'
}
export const PropertyEvaluateSituationValues = Object.values(PropertyEvaluateSituation)

export interface IProperty {
  _id?: Types.ObjectId
  creatorId?: Types.ObjectId
  description?: string
  address?: string
  image?: string
  evaluateSituation?: PropertyEvaluateSituation
  visible?: boolean
  isAlocated?: boolean
}

export class PropertyModel extends MongoModel<IProperty> {
  private readonly _creatorId: IProperty['creatorId']
  private readonly _description: IProperty['description']
  private readonly _address: IProperty['address']
  private readonly _image: IProperty['image']
  private readonly _evaluateSituation: IProperty['evaluateSituation']
  private readonly _visible: IProperty['visible']
  private readonly _isAlocated: IProperty['isAlocated']

  constructor (property: IProperty) {
    super(property)
    
    this._creatorId = property.creatorId
    this._description = property.description
    this._address = property.address
    this._image = property.image
    this._evaluateSituation = property.evaluateSituation
    this._visible = property.visible
    this._isAlocated = property.isAlocated
  }

  get object (): Partial<IProperty> {
    return {
      creatorId: this._creatorId,
      description: this._description,
      address: this._address,
      image: this._image,
      evaluateSituation: this._evaluateSituation,
      isAlocated: this._isAlocated,
      visible: this._visible
    }
  }

  get saveDB (): Partial<IProperty> {
    return { ...this.object }
  }
}