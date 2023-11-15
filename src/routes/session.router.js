import { Router } from 'express'
import { register, login, privateUser, errorUser, github, githubCallback, current } from '../controllers/session.controller.js'
import { passportJWT } from '../utils.js'
import passport from 'passport'

const router = Router()

router.get(
    '/github', 
    passport.authenticate('github', {
        scope: ['user:email']
    }),
    github
    )
router.get(
    '/githubcallback', 
    passport.authenticate('github', {
        failureRedirect: '/session/error-github'
    }),
    githubCallback
    )
router.post(
    '/register', 
    passport.authenticate('register', {
        failureRedirect: '/session/error'
    }),
    register
    )
router.post(
    '/login', 
    passport.authenticate('login', {
        failureRedirect: '/session/error'
    }),
    login
    )
router.get('/private', passportJWT(), privateUser)
router.get('/current', passport.authenticate('jwt', {
    failureRedirect: '/session/current-error'
    }),
    current)

router.get('/error', errorUser)

export default router