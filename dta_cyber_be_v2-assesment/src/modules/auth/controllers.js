const {apiOkResponse, isNull} = require("../common/helpers");
const {BaseApiValidator, ApiError} = require("../common/validators");
const {User} = require("./models");
const {ldapAuthenticate} = require("./helpers");


// central response
const loginResponse1 = (user) => ({
    token: user.id,
    user_data: user
})


// Login api for the app. Sends token.
 const loginController = async (req, res, next, ...rest) => {
     class _Validator extends BaseApiValidator {
         fields = {
             "password": {},
             "username": {},
         }
         async validate_username(value, data) {
             let user = await User.findOne({
                 where: {
                     username: value,
                 }
             })
             console.log(isNull(user),user)
             // skip ldap check for users
             if (value === 'admin' && isNull(user)) {
                 console.log(user,"val")
                 res.json(200, {
                     data,
                     is_success: true,
                     action: "DO_NOTHING"
                 })
             }

              // LDAP Try
              let ldapResponse = await ldapAuthenticate(
                  value, data['password']
              )

             // LDAP
             if (ldapResponse['isSuccess'] === false) {
                 throw new ApiError("Unable to login with provided credentials.")
             }

              // Handle LDAP Auth
              if (!isNull(ldapResponse) && ldapResponse['isSuccess'] === true && isNull(user)) {
                  user = await User.create({
                      username: value,
                      password: null
                  })
              }

//              // TODO: Login Completion with Daimler Integration
//              // TODO: GraphQL + LDAP
             return user
          }
      }

     try {
         const validator = new _Validator(req)
         console.log(await validator.isValid(),"isValid")
         await validator.isValid()
         console.log(await validator.isValid())
         const user = validator.data['username']
         loginResponse1(user)
         console.log(user)
         apiOkResponse(res, loginResponse1(user))

      } catch (e) {
          next(e)
          res.send({token:1})
      }
  }
// const loginController = async (req, res, next, ...rest) => {
//     class _Validator extends BaseApiValidator {
//         fields = {
//             "password": {},
//             "username": {},
//         }
//         async validate_username(value, data) {
//             let user =  {
//                     username: value,
//                     password:data.password,
//                     id:1
//                 }
//             console.log(isNull(user),user,data)
//             // skip ldap check for users
//             if (value === 'admin' && !isNull(user)) {
//                 console.log(user,"val")
//                 return user
//             }
//
//             // LDAP Try
//             let ldapResponse = await ldapAuthenticate(
//                 value, data['password']
//             )
//
//             // LDAP
//             if (ldapResponse['isSuccess'] === false) {
//                 throw new ApiError("Unable to login with provided credentials.")
//             }
//
//             // Handle LDAP Auth
//             if (!isNull(ldapResponse) && ldapResponse['isSuccess'] === true && isNull(user)) {
//                 user = await User.create({
//                     username: value,
//                     password: null
//                 })
//             }
//
//            // TODO: Login Completion with Daimler Integration
//            // TODO: GraphQL + LDAP
//            return user
//        }
//    }
//
//     try {
//         const validator = new _Validator(req)
//         console.log(await validator.isValid(),"isValid")
//         await validator.isValid()
//         console.log(await validator.isValid())
//         const user = validator.data['username']
//         loginResponse1(user)
//         console.log(user)
//         apiOkResponse(res, loginResponse1(user))
//
//     } catch (e) {
//         next(e)
//         res.send({token:1})
//     }
// }
     

const refreshController = async (req, res, next) => {
    try {
        apiOkResponse(res, loginResponse1(req.user))
    } catch (e) {
        next(e)
    }
}


module.exports = {
    loginController,
    refreshController,
}
