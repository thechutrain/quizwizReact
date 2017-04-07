// let validKeys = [ 'name', {key: 'description', optional: true}, {key: 'date', optional: false} ]
/**
 * @param {array of strings || objects} validKeys - strings of required params, and you can specify optional params as well
 */
function validator (validKeys) {
  return function (req, res, next) {
    let valid = true
    let errors = []
    let requiredKeys = []
    let optionalKeys = []
    // 1. get valid and optional keys
    validKeys.forEach((obj) => {
      if (typeof obj === 'string') {
        requiredKeys.push({key: obj, seen: false})
      } else if (!obj.optional) {
        requiredKeys.push({key: obj.key, seen: false})
      } else {
        optionalKeys.push(obj.key)
      }
    })
    // 2. check the body of the request
    Object.keys(req.body).forEach((reqKey) => {
      let found = false
      // 2a. check if the request key is in required
      requiredKeys.forEach((kObj) => {
        if (kObj.key === reqKey && !kObj.seen) {
          kObj.seen = true
          found = true
        }
      })
      // 2b. check to see that the reqKey is in optional keys
      if (!found) {
        if (optionalKeys.indexOf(reqKey) === -1) {
          valid = false
          errors.push(`Found a key "${reqKey} "that was not a required or optional parameter!`)
        }
      }
    }) // closes outer forEach
    // 3. check that all required keys have been seen
    requiredKeys.forEach((keyObj) => {
      if (!keyObj.seen) {
        valid = false
        errors.push(`Missing a required parameter of ${keyObj.key}`)
      }
    })
    // 4. No errors!
    if (valid) {
      next()
    } else {
      next(new Error(JSON.stringify(errors)))
    }
  } // ends middleware function
} // ends validator

module.exports = validator
