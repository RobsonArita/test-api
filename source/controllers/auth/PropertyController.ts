import { NextFunction, Request, Response, Router } from 'express'
import Validator from '../../validators/Validator'
import PropertyValidator from '../../validators/PropertyValidator'
import { PropertyService } from '../../services/PropertyService'
import { UserRepositoryImp } from '../../models/user/UserMongoDB'
import { PropertyRepositoryImp } from '../../models/property/PropertyMongoDB'
import { customResponse } from '../../middleware'
import CreateProperty from '../../middlewares/CreateProperty'

const PropertyController = Router()
const validator = new PropertyValidator()

export const PropertyServiceImp = new PropertyService(
  UserRepositoryImp,
  PropertyRepositoryImp
)

PropertyController.post('/solicitate', CreateProperty, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { address, description, title, image } = request.body
    const { userId } = request

    validator.validate(
      { userId },
      { address },
      { description },
      { title },
      { image }
    )
    await PropertyServiceImp.create(userId, { address, description, title, image: image.split(',') })
    return customResponse.send_ok('Solicitação de imóvel criada com sucesso!')
  } catch (err) {
    console.log({ err })
    return next(err)
  }
})

export default PropertyController