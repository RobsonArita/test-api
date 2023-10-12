import { NextFunction, Request, Response } from 'express'
import { UserLevel } from '../models/user/UserModel'
import { customResponse } from '../middleware'

const CreateProperty = (request: Request, _: Response, next: NextFunction) => {
 try {
  const canCreatePropertyLevels = [UserLevel.proprietario, UserLevel.admin]
  if (!canCreatePropertyLevels.includes(request.level as UserLevel)) throw ''

  return next()
 } catch (err) {
  return customResponse.send_forbidden('Sem Permissão')
 }
}

export default CreateProperty