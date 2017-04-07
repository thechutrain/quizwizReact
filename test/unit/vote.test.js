'use strict'
/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../models')
const query = require('../../controllers/apiQuery')

const title =
`
===============================
Unit test on "vote" model
===============================
`

describe(title, () => {
  before(() => {
    return models.sequelize.sync({ force: true })
  })

  it('should be an empty vote table', (done) => {
    query.findAllVotes().then((results) => {
      try {
        assert.deepEqual(results, [])
        done()
      } catch (e) {
        done(e)
      }
    })
  })

  it('should be able to make a new vote', (done) => {
    let testVote = {
      userId: 1,
      quizId: 2,
      stars: 5
    }
    query.vote(testVote).spread((result, created) => {
      assert.isTrue(created, 'vote should be created')
      // console.log(result.dataValues)
      done()
    })
  })

  it('should be able to update the previous vote', (done) => {
    let testVote = {
      userId: 1,
      quizId: 2,
      stars: 0
    }
    query.vote(testVote).spread((result, created) => {
      assert.isFalse(created, 'vote should not have been created')
      // console.log(result)
      done()
    })
  })

  it('should not be able to update vote with bad params', (done) => {
    let badVote = {
      userId: 1,
      quizId: 2,
      error: 'duhhh'
    }
    query.vote(badVote).spread((result, created) => {
      expect(result).to.have.any.keys('error')
      assert.isFalse(created, 'vote should not have been created')
      done()
    })
  })
}) // ends describe
