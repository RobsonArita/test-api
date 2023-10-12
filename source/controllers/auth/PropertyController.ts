import { NextFunction, Request, Response, Router } from 'express'
import Validator from '../../validators/Validator'
import PropertyValidator from '../../validators/PropertyValidator'

const PropertyController = Router()
const validator = new PropertyValidator()

PropertyController.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { address } = request.body
    validator.validate(
      { address }
    )
  } catch (err) {
    return next(err)
  }
})

export default PropertyController