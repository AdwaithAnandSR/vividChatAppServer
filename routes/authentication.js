import express from 'express'
const router = express.Router()

import { Login, Signup, Logout } from '../handlers/authenticationRoutes.js'

router.post('/signin', Login);

router.post('/signup', Signup);

router.post('/signout', Logout);

export default router;