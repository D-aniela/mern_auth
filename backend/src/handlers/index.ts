import { Request, Response } from 'express'
import slug from 'slug'
import formidable from 'formidable'
import { v4 as uuid } from 'uuid'

import { checkPassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'
import User from '../models/User'
import cloudinary from '../config/cloudinary'

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
  res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle })
    if (handleExists && handleExists.email !== req.user.email) {
      return res.status(409).send({ msg: 'El nombre de usuario ya existe' })
    }

    // Actualizar usuario
    req.user.description = description
    req.user.handle = handle
    req.user.links = links

    await req.user.save()
    res.send('Perfil Actualizado Correctamente')
  } catch (e) {
    const error = new Error('Hubo un error')
    return res.status(500).json({ error: error.message })
  }
}

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const form = formidable({ multiples: false })
    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(
        files.image[0].filepath,
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            const error = new Error('Hubo un error al subir la imagen')
            return res.status(500).json({ error: error.message })
          }
          if (result) {
            req.user.image = result.secure_url
            await req.user.save()
            res.json({ image: result.secure_url })
          }
        }
      )
    })
  } catch (e) {
    const error = new Error('Hubo un error')
    return res.status(500).json({ error: error.message })
  }
}

export const getUserByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.params
    const user = await User.findOne({ handle }).select(
      '-_id -__v -email -password'
    )
    if (!user) {
      const error = new Error('El usuario no existe')
      return res.status(404).json({ error: error.message })
    }
    res.json(user)
  } catch (e) {
    const error = new Error('Hubo un error')
    return res.status(500).json({ error: error.message })
  }
}
