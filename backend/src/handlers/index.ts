import { Request, Response } from 'express'
import slug from 'slug'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) {
    return res.status(409).send({ msg: 'El usuario ya existe' })
  }

  const handle = slug(req.body.handle, '')
  const handleExists = await User.findOne({ handle })
  if (handleExists) {
    return res.status(409).send({ msg: 'El nombre de usuario ya existe' })
  }

  const user = new User(req.body)
  user.password = await hashPassword(password)
  user.handle = handle

  await user.save()

  res.send({ msg: 'Usuario creado correctamente' })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const userExist = await User.findOne({ email })
  if (!userExist) {
    const error = new Error('El usuario no existe')
    return res.status(404).send({ error: error.message })
  }

  const isPasswordCorrect = await checkPassword(password, userExist.password)
  if (!isPasswordCorrect) {
    const error = new Error('La contraseña es incorrecta')
    return res.status(401).send({ error: error.message })
  }

  const token = generateJWT({ id: userExist._id })

  res.send(token)
}

export const getUser = async (req: Request, res: Response) => {
  const bearer = req.headers.authorization
  if (!bearer) {
    const error = new Error('No Autorizado')
    return res.status(401).send({ error: error.message })
  }

  const [, token] = bearer.split(' ')
  if (!token) {
    const error = new Error('No Autorizado')
    return res.status(401).send({ error: error.message })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decoded === 'object' && decoded.id) {
      const user = await User.findById(decoded.id).select('-password')
      if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(401).send({ error: error.message })
      }
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ error: 'TOKEN NO VÁLIDO' })
  }
}
