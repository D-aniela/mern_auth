import { Router } from 'express'
import { body } from 'express-validator'

import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

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

export default router
