import { Router } from 'express'
import { body } from 'express-validator'

import {
  createAccount,
  getUser,
  getUserByHandle,
  login,
  searchByHandle,
  updateProfile,
  uploadImage,
} from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

const router = Router()

/** Autenticacion y registro */
router.post(
  '/auth/register',
  body('handle').notEmpty().withMessage('El handle no puede estar vacio'),
  body('name').notEmpty().withMessage('El nombre no puede estar vacio'),
  body('email').isEmail().withMessage('El email no es valido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .notEmpty(),
  // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
  // .withMessage(
  //   'La contraseña debe tener al menos una letra mayuscula, una letra minuscula y un numero'
  // ),
  handleInputErrors,
  createAccount
)

router.post(
  '/auth/login',
  body('email').isEmail().withMessage('El email no es valido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  login
)

router.get('/user', authenticate, getUser)

router.patch(
  '/user',
  body('handle').notEmpty().withMessage('El handle no puede estar vacio'),
  handleInputErrors,
  authenticate,
  updateProfile
)

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post(
  '/search',
  body('handle').notEmpty().withMessage('El handle no puede estar vacio'),
  handleInputErrors,
  searchByHandle
)

export default router
