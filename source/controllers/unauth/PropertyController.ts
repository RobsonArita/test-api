import { NextFunction, Request, Response, Router } from 'express'
import { PropertyService } from '../../services/PropertyService'
import { PropertyServiceImp } from '../auth/PropertyController'
import { customResponse } from '../../middleware'

const UnauthPropertyController = Router()

UnauthPropertyController.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = request.params
    const { page } = request.query

    const paginate = await PropertyServiceImp.list(userId.toString(), { page: page ? Number(page) : 1 })
    return customResponse.send_ok('Imóveis encontrados com sucesso!', { paginate })
  } catch (err) {
    return next(err)
  }
})

export default UnauthPropertyController