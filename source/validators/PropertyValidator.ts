import is from '../is'
import Validator from './Validator'

export default class PropertyValidator extends Validator {
  constructor () {
    super ()

    this.validator.addRule('address', {
      validator: (value) => is.string(value),
      message: 'Endereço inválido!'
    })

  }
}