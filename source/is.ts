import mongoose from 'mongoose'

const is = {
  string: (value) => (typeof value === 'string' || value instanceof String),
  objectId: variable => (String(variable).length === 12 || String(variable).length == 24) && mongoose.Types.ObjectId.isValid(variable),
}

export default is