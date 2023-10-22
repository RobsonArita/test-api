import bcrypt from 'bcrypt'
import { customResponse } from '../middleware'
import { UserRepositoryImp } from '../models/user/UserMongoDB'
import { jwtFunction } from '../jwt/setupJWT'
import { IUser } from '../models/user/UserModel'

class SigninService {
  private readonly userRepository: typeof UserRepositoryImp
  constructor (userRepository: typeof UserRepositoryImp) {
    this.userRepository = userRepository
  }

  async signin (email: string, password: string): Promise<ISigninReturn> {
    const authenticationFailedMessage = 'Autenticação inválida!'
    const user = await this.userRepository.findOne({ email })
    if (!user) throw customResponse.send_unauthorized(authenticationFailedMessage)
    if (!user.object.password) throw customResponse.send_unauthorized(authenticationFailedMessage)
  
    const allowedPassword = await bcrypt.compare(password, user.object.password)
    if (!allowedPassword) throw customResponse.send_unauthorized(authenticationFailedMessage)

    const token = jwtFunction.generateToken({ ...user.object, _id: user._id })
    return { token, user: user.object}
  }
}

export interface ISigninReturn {
  user: IUser
  token: string
}

export default SigninService