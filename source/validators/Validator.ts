import requestCheck from 'request-check'
import { customResponse } from '../middleware'
import is from '../is'

export default class Validator {
  public validator: any

  constructor () {
    this.validator = requestCheck()
    this.validator.requiredMessage = 'Campo obrigatório!'
  }

  public validate (...args: Array<{ [key: string]: any } | undefined>) {
    const invalid = this.validator.check(...args)

    if (invalid) throw customResponse.send_badRequest('Campos inválidos!', { invalid })
  }
}