'use strict'
/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../models')
const query = require('../../controllers/apiQuery')

const title =
`
===============================
Unit test on "userquiz" model
===============================
`

// Define testing variables
let userTest = {
  username: 'I_am_a_test',
  password: 'incorrect'
}

let quizTest = {
  title: 'US History Testing Quiz',
  description: 'A quiz on the history of the United States',
  madeBy: 1
}

let userQuiz = {
  userId: 1,
  quizId: 1,
  score: 89.12
}

let userQuizAgain = {
  userId: 1,
  quizId: 1,
  score: 94.32
}

describe(title, () => {
  before(() => {
    return models.sequelize.sync({ force: true })
  })

  it('should be an empty userquiz table', (done) => {
    query.findQuizzesTaken().then((results) => {
      try {
        assert.deepEqual(results, [])
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to take a quiz', (done) => {
    // add user, then quiz, then userQuiz
    query.addUser(userTest).then(() => {
      return query.makeQuiz(quizTest)
    }).then(() => {
      return query.takeQuiz(userQuiz)
    }).then((result) => {
      let createdUserQuiz = result.dataValues
      assert.equal(createdUserQuiz.score, userQuiz.score, 'should be the same score')
      done()
    })
  })

  it('shoud be able to find the new quiz that was taken', (done) => {
    query.findQuizzesTaken(1).then((results) => {
      expect(results).to.have.lengthOf(1)
      // MORE TESTING CASES HERE?
      done()
    })
  })

  it('should be able to take another quiz', (done) => {
    query.takeQuiz(userQuizAgain).then((result) => {
      let createdUserQuiz = result.dataValues
      assert.equal(createdUserQuiz.score, userQuizAgain.score, 'should be the same score')
      done()
    })
  })

  it('should be able to find all the quizzes taken by a user', (done) => {
    query.findQuizzesTaken(1).then((results) => {
      expect(results).to.have.lengthOf(2)
      done()
    })
  })
})
