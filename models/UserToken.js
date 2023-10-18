import { Schema, model } from "mongoose"

const userTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    extends: 30 * 86400
  }
})

const UserToken = model('UserToken', userTokenSchema)

export default UserToken