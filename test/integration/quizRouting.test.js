'use strict'
/* global it, describe, before */
const chai = require('chai')
let dirtyChai = require('dirty-chai')
const assert = require('chai').assert
const expect = require('chai').expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.use(dirtyChai)
const server = require('../../server')

// require the database models
const models = require('../../models')
const query = require('../../controllers/apiQuery')

const title =
`
===============================
Integration Test '/quiz' routes
===============================
`

// testing variables
let newQuiz1 = {
  title: 'quizwiz',
  description: 'a testing quiz from chaiHTTP',
  madeBy: 1
}
let newQuiz2 = {
  title: 'quizwiz 2',
  description: 'this is a different quiz',
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

  it('should be an empty database', (done) => {
    query.findAllUsers().then((results) => {
      assert.deepEqual(results, [])
      return query.findQuizzesTaken()
    }).then((results) => {
      assert.deepEqual(results, [])
      return query.findAllQuizzes()
    }).then((results) => {
      assert.deepEqual(results, [])
      // done()
      return query.findAllVotes()
    }).then((results) => {
      assert.deepEqual(results, [])
      done()
    })
  })

  it('should be an empty list of quizzes @ GET "/api/quiz"', (done) => {
    chai.request(server)
      .get('/api/quiz')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        assert.deepEqual(res.body, [])
        done()
      })
  })

  it('should be able to post a new quiz @ POST "/api/quiz"', (done) => {
    chai.request(server)
      .post('/api/quiz')
      .send(newQuiz1)
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        // console.log(res.body)
        done()
      })
  })

  it('should not be able to another quiz with the same title @ POST "/api/quiz"', (done) => {
    chai.request(server)
      .post('/api/quiz')
      .send(newQuiz1)
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        // console.log(res.body)
        assert.isFalse(res.body.created, 'should not have created the same quiz')
        done()
      })
  })

  it('should be able to make different quiz @ POST "/api/quiz"', (done) => {
    chai.request(server)
      .post('/api/quiz')
      .send(newQuiz2)
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        // console.log(res.body)
        done()
      })
  })


  it('should be able to get the all the quizzes @ GET "/api/quiz"', (done) => {
    chai.request(server)
      .get('/api/quiz')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        // console.log(res.body) // array of the quizzes
        let resultArray = res.body
        assert.property(resultArray[0], 'id', '1', 'first quiz should have id of 1')
        assert.property(resultArray[0], 'title', `${newQuiz1.title}`, 'first quiz should have correct title')
        assert.property(resultArray[1], 'id', '2', 'second quiz should have id of 2')
        assert.property(resultArray[1], 'title', `${newQuiz2.title}`, 'second quiz should have correct title')
        done()
      })
  })

  it('should be able to get a specific quiz by id @ GET "/api/quiz/:id"', (done) => {
    chai.request(server)
      .get('/api/quiz/1')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        assert.property(res.body, 'id', '1', 'first quiz should have id of 1')
        console.log(res.body)
        done()
      })
  })
})
