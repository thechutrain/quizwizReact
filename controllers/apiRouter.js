'use strict'
const express = require('express')
const router = express.Router()
const query = require('./apiQuery')
const validator = require('./middleware/validator')

/** ========== Routes Related to User ============
 *  GET /user --> gets all users
 *  GET /user/:id --> gets a specified user based on their id
 *  POST /user --> makes a new user
 *  TODO  .... PUT /user/:id --> update params on the user
 */
router.get('/user', (req, res) => {
  query.findAllUsers().then((users) => {
    res.json(users)
  })
})

router.get('/user/:id', (req, res) => {
  query.findUserById(req.params.id).then((user) => {
    res.json(user)
  })
})

router.post('/user',
  validator(['username', 'password']),
  (req, res) => {
    query.addUser(req.body).spread((user, created) => {
      res.json({ user, created })
    })
  }
)

/** =========== Routes Related to Quiz ==========
 * GET /quiz
 * GET /quiz/:id
 * POST /quiz
 *
 */
router.get('/quiz', (req, res) => {
  query.findAllQuizzes().then((result) => {
    res.json(result)
  })
})

router.get('/quiz/:id', (req, res) => {
  query.findQuizById(req.params.id).then((result) => {
    res.json(result)
  })
})

router.post('/quiz',
  validator(['title', {key: 'description', optional: true}, 'madeBy']),
  (req, res) => {
    query.makeQuiz(req.body).spread((user, created) => {
      res.json({user, created})
    })
  }
)

/** =========== Routes Related to UserQuiz ==========
 * GET /userquiz --> gets all the instances of quizzes taken
 * GET /quiz/:quizId/user/:userId --> gets
 * POST /userquiz --> makes a new quiz instance
 *
 */

router.get('/quizzes-taken', (req, res) => {
  query.findQuizzesTaken().then((results) => {
    res.json(results)
  })
})

router.get('/quizzes-taken/quiz/:quizId', (req, res) => {
  query.findQuizzesTaken({
    quizId: req.params.quizId
  }).then((results) => {
    res.json(results)
  })
})

router.get('/quizzes-taken/quiz/:quizId/user/:userId', (req, res) => {
  query.findQuizzesTaken({
    quizId: req.params.quizId,
    userId: req.params.userId
  }).then((results) => {
    res.json(results)
  })
})

module.exports = router
