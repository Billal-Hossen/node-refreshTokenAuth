import { Router } from "express"
import bcrypt from 'bcrypt'
import { logInBodyValidation, signUpBodyValidation } from "../utils/validationSchema.js"
import User from "../models/User.js"
import generateTokens from "../utils/generateTokens.js"


const router = Router()

router.post('/signup', async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body)

    if (error) {
      return res.status(400).json({ error: true, message: error.details[0].message })
    }
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: true, message: 'User with given email already exist' })
    }

    const salt = await bcrypt.genSalt(process.env.SALT)
    const hashPawword = await bcrypt.hash(req.body.password, salt)

    await new User({ ...req.body, password: hashPawword }).save()
    return res.status(201).json({ error: false, message: 'Account Created Successfully' })

  } catch (error) {
    console.log(err)
    res.status(500).json({ error: true, message: "Internal Server Error" })
  }

})


router.post('/login', async (req, res) => {
  try {
    const { error } = logInBodyValidation(req.body)

    if (error) {
      return res.status(400).json({ error: true, message: error.details[0].message })
    }
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ error: true, message: 'Invalid email or password' })
    }

    const verifiedPassword = await bcrypt.compare(req.body.password, user.password)
    if (!verifiedPassword) {
      return res.status(401).json({ error: true, message: 'Invalid email or password' })
    }

    const { accessToken, refreshToken } = await generateTokens(user)
    return res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      message: "Logged in sucessfully",
    })

  } catch (error) {
    console.log(err)
    res.status(500).json({ error: true, message: "Internal Server Error" })
  }

})

export default router