'use strict'
/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../models')
const query = require('../../controllers/apiQuery')

const title =
`
============================================
Integration Test on 'User' model join query
============================================
`

describe(title, () => {
  let newUser1 = {username: 'Alan', password: 'password'}
  let newQuiz1 = {
    title: 'A test Quiz',
    description: 'a quiz that was made in a test for testing purposes',
    madeBy: 1
  }
  let newQuizTaken1 = {
    userId: 1,
    quizId: 1,
    score: 87.65
  }
  let newVote1 = {
    userId: 1,
    quizId: 1,
    stars: 4
  }
  before(function () {
    return new Promise((resolve, reject) => {
      models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
        models.sequelize.sync({ force: true }).then(() => {
          query.addUser(newUser1).then(() => {
            return query.makeQuiz(newQuiz1)
          })
          .then(() => {
            return query.takeQuiz(newQuizTaken1)
          }).then(() => {
            return query.vote(newVote1)
          }).then(() => {
            resolve()
          })
        })
      })
    })
  })

  it('should have just one user', (done) => {
    query.findAllUsers().then((results) => {
      expect(results).to.have.lengthOf(1)
      done()
    })
  })

  it('should be able to find a user and their quizzes taken and votes', (done) => {
    query.findUserById(1).then((result) => {
      let user = result.dataValues
      user.userquizzes = user.userquizzes[0].dataValues
      user.votes = user.votes[0].dataValues
      // console.log(user)
      expect(user).to.have.deep.property('userquizzes.score', newQuizTaken1.score)
      expect(user).to.have.deep.property('votes.stars', newVote1.stars)
      done()
    })
  })
})
