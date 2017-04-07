// module.exports = function () {
//   return function (err, req, res, next) {
//     console.log(err.stack)
//     res.json({ err })
//   }
// }

// Version 2
module.exports = (err, req, res, next) => {
  console.log(err.stack)
  res.json({ err_msg: err.message, err_stack: err.stack })
}
