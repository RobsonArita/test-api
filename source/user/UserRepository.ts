import { UserModel } from "./UserModel";
import { IUserModel } from "./UserMongoDB";

export class UserRepository {
  private readonly mongoDB: IUserModel & { aggregatePaginate?: any }
  constructor (mongoDB: IUserModel) {
    this.mongoDB = mongoDB
  }

  async find (query): Promise<Array<UserModel>> {
    const users = await this.mongoDB.find(query)

    const models = (users || []).map(
      (document) => new UserModel(document)
    )

    return models
  }
}