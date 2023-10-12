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
    const { address, description } = request.body
    const { userId } = request

    validator.validate(
      { userId },
      { address },
      { description }
    )

    await PropertyServiceImp.create(userId, { address, description })
    return customResponse.send_ok('Solicitação de imóvel criada com sucesso!')
  } catch (err) {
    return next(err)
  }
})

export default PropertyController