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
Integration Test '/user' routes
===============================
`



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

  it('should be an empty list of users @ GET "/api/user"', (done) => {
    chai.request(server)
      .get('/api/user')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        assert.deepEqual(res.body, [])
        done()
      })
  })

  it('should be able to create a new user @ POST "/api/user"', (done) => {
    let newUser = {
      username: 'alan',
      password: 'fakePassword'
    }
    chai.request(server)
      .post('/api/user')
      .send(newUser)
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        // console.log(res.body)
        done()
      })
  })

  it('should be able to get the new user @ GET "/api/user/:id', (done) => {
    chai.request(server)
      .get('/api/user/1')
      .end((err, res) => {
        expect(err).to.be.null()
        expect(res).to.have.status(200)
        let userReturned = res.body
        expect(userReturned).to.have.all.keys('id', 'username', 'password', 'createdAt', 'updatedAt', 'votes', 'userquizzes')
        done()
      })
  })
})
