import is from '../is'
import { UserLevelValues } from '../models/user/UserModel'
import Validator from './Validator'

export default class LoginValidator extends Validator {
  constructor () {
    super ()

    this.validator.addRule('email', {
      validator: (value) => is.string(value),
      message: 'Email inválido!'
    })

    this.validator.addRule('name', {
      validator: (value) => is.string(value),
      message: 'Nome inválido!'
    })

    this.validator.addRule('cellphone', {
      validator: (value) => is.string(value),
      message: 'Telefone inválido!'
    })

    this.validator.addRule('level', {
      validator: (value) => UserLevelValues.includes(value),
      message: 'Nível inválido!'
    })

    this.validator.addRule('password', {
      validator: (value) => is.string(value),
      message: 'Senha não é válida!'
    })

  }
}