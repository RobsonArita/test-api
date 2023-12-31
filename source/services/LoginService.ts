import bcrypt from 'bcrypt'
import { customResponse } from '../middleware'
import { UserRepositoryImp } from '../models/user/UserMongoDB'
import { UserLevel, UserModel } from '../models/user/UserModel'

class LoginService {
  private readonly userRepository: typeof UserRepositoryImp
  constructor (userRepository: typeof UserRepositoryImp) {
    this.userRepository = userRepository
  }

  async register (name: string, email: string, cellphone: string, level: string, password: string): Promise<void> {
    const existsUser = await this.userRepository.exists({ email })
    if (existsUser) throw customResponse.send_forbidden('Usuário com este email já existe!', { email })

    const isAdmin = level === UserLevel.admin
    const registeredLevel = isAdmin ? UserLevel.admin : level === UserLevel.proprietario ? UserLevel.proprietario : UserLevel.locatario
    await this.userRepository.create(new UserModel({
      cellphone,
      email,
      level: registeredLevel,
      name
    }))

    await this.signup(email, password)
  }

  async signup (email: string, password: string): Promise<void> {
    const existsUser = await this.userRepository.findOne({ email })

    if (!existsUser?._id) throw customResponse.send_notFound('Usuário com este email não encontrado!', { email })
    if (existsUser.object?.password) throw customResponse.send_forbidden('Usuário já registrado com esse email!', { email })

    const criptedPassword = await bcrypt.hash(password, 14)
    await this.userRepository.setPassword(existsUser._id, criptedPassword)
  }
}

export default LoginService