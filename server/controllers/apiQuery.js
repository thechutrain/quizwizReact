const db = require('../models')

module.exports = {
  // ========= User Queries ==========
  /** finds a specific user in the user table
   * @param {number} id - the user id
   */
  findUserById: (id) => {
    return db.user.findOne({
      where: { id },
      include: [
        { model: db.userquiz },
        { model: db.vote }
      ]
    })
  },

  /**  finds all the users in the database
   *
   */
  findAllUsers: () => {
    return db.user.findAll()
  },
  addUser: (userObj) => {
    return db.user.findOrCreate({ where: { username: userObj.username }, defaults: userObj })
  },

  // ========== Quiz Queries ==========
  // findQuiz: (id) => (id ? db.quiz.findOne({ where: { id } }) : db.quiz.findAll()),
  findQuizById: (id) => (db.quiz.findOne({ where: { id } })),
  findAllQuizzes: () => {
    return db.quiz.findAll()
  },
  makeQuiz: (quizObj) => {
    return db.quiz.findOrCreate({ where: { title: quizObj.title }, defaults: quizObj })
  },

  // ========== UserQuiz Queries ==========
  takeQuiz: (dataObj) => {
    return db.userquiz.create(dataObj)
  }, // ends takeQUiz



  findQuizzesTaken: (searchObj = {}) => {
    return Object.keys(searchObj).length === 0
      ? db.userquiz.findAll()
      : db.userquiz.findAll({where: searchObj})
  },

  // ========== Vote related queries ==========
  /**
   * @param {obj} voteObj - an object containing userId, quizId, stars etc.
   * @return { result, created } -
   */
  vote: (voteObj) => {
    return db.vote.findOrCreate({
      where: {
        userId: voteObj.userId,
        quizId: voteObj.quizId
      },
      defaults: voteObj
    }).spread((result, created) => {
      if (created) {
        return [result, created]
      } else {
        return db.vote.update(
          {
            stars: voteObj.stars
          },
          {
            where: {
              userId: voteObj.userId,
              quizId: voteObj.quizId
            }
          }
        ).then((result) => {
          if (result[0] === 1) {
            return db.vote.find({
              where: {
                userId: voteObj.userId,
                quizId: voteObj.quizId
              }
            }).then((update) => {
              return [update.dataValues, created]
            })
          } else {
            return [{ error: true, msg: 'failed to update vote' }, created]
          }
        })
      }
    })
  },

  findAllVotes: () => {
    return db.vote.findAll()
  }
}
