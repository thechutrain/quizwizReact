'use strict'
/* global it, describe, before */
const assert = require('chai').assert
// const expect = require('chai').expect

const models = require('../../models')
const query = require('../../controllers/apiQuery')

const title =
`
===============================
Unit test on "quiz" model
===============================
`

let quizTest = {
  title: 'US History Testing Quiz',
  description: 'A quiz on the history of the United States',
  madeBy: 1
}

describe(title, () => {
  // before(function () {
  //   return new Promise((resolve, reject) => {
  //     models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(() => {
  //       models.sequelize.sync({ force: true }).then(() => {
  //         resolve()
  //       })
  //     })
  //   })
  // })
  before(function () {
    return models.sequelize.sync({ force: true })
  })

  it('Should be an empty quiz table', (done) => {
    query.findAllQuizzes().then((results) => {
      try {
        assert.deepEqual(results, [])
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should not return a non-existent user', (done) => {
    done()
  })

  it('should be able to create a new quiz', (done) => {
    query.makeQuiz(quizTest).spread((result, created) => {
      try {
        // let quiz = result.dataValues
        // console.log(quiz)
        assert.equal(created, true, 'created value should be true')
        done()
      } catch (e) {
        done(e)
      }
    })
  })
}) // ends describe
