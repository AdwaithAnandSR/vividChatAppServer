import express from 'express'
const router = express.Router()

import { Login, Signup } from '../handlers/authenticationRoutes.js'

router.post('/signin', Login);

router.post('/signup', Signup);

export default router;