import { NextFunction, Request, Response, Router } from 'express'
import Validator from '../../validators/Validator'
import PropertyValidator from '../../validators/PropertyValidator'
import { PropertyService } from '../../services/PropertyService'
import { UserRepositoryImp } from '../../models/user/UserMongoDB'
import { PropertyRepositoryImp } from '../../models/property/PropertyMongoDB'
import { customResponse } from '../../middleware'
import CreateProperty from '../../middlewares/CreateProperty'
import { FileRepositoryImp } from '../../models/file/FileMongoDB'

const PropertyController = Router()
const validator = new PropertyValidator()

export const PropertyServiceImp = new PropertyService(
  UserRepositoryImp,
  PropertyRepositoryImp,
  FileRepositoryImp
)

PropertyController.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { userId } = request
    const { page } = request.query

    const paginate = await PropertyServiceImp.list({ page: page ? Number(page) : 1 }, userId?.toString())
    return customResponse.send_ok('Imóveis encontrados com sucesso!', { paginate })
  } catch (err) {
    return next(err)
  }
})

PropertyController.post('/solicitate', CreateProperty, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { address, description, title, image, value } = request.body
    const { userId } = request

    validator.validate(
      { userId },
      { address },
      { description },
      { title },
      { image },
      { value }
    )
    await PropertyServiceImp.create(userId, { address, description, title, image: image.split(','), value })
    return customResponse.send_ok('Solicitação de imóvel criada com sucesso!')
  } catch (err) {
    console.log({ err })
    return next(err)
  }
})

PropertyController.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params

    const property = await PropertyServiceImp.detail(id)
    return customResponse.send_ok('Propriedade encontrada!', { property })
  } catch (err) {
    console.log({ err })
    return next(err)
  }
})

export default PropertyController