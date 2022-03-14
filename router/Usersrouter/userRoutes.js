const express  =require('express')
const authController =require('../../controllers/authController/authController')
const isAuthentication  =require('../../middleware/authication')
const Upload = require('../../middleware/uploadFiles')
const {check} = require('express-validator');


const router =express.Router()    

     
router
     .route('/user')  
     .get(
         isAuthentication,
         authController.userPanel
         ) 


router 
   .route('/pages-register')
   .get(authController.signupPage)
   .post(
         [
             check('name','The name must be 3+ char long').isLength({min:3}).notEmpty(),
             check('email','Email is not a valid && please fill another email').isEmail().withMessage({message: 'Not an email',errorCode: 1}).notEmpty(),
         ],
         authController.signup
        )



router
    .route('/login')
    .get(authController.LogInpage)
    .post(
          [
            check('email','Email is not avlid').isEmail().withMessage('filed are required')
          ],  
            authController.login
        )   



router
     .route('/dashboard')
     .get(
          isAuthentication,
          authController.dashboard
        )   


router
    .route('/changepassword')
    .get(isAuthentication,authController.getChangePassword)
    .post(
        [
            check('newPassword','The Password must be 8+char long').isLength({min:5}).isEmpty(),
            check('confirmNewpassword','The Password must be 8+char long').isLength({min:5}).isEmpty()

          ],isAuthentication,
        authController.ChangePassword
        )        


     
     
router
     .route('/logout')  
     .get(
         isAuthentication,
         authController.logout
         ) 



router
    .route('/query')
    .post(
        isAuthentication,
        Upload.fields([{ name: 'avatar', maxCount: 6}]),
        authController.Query
    )



router.route('/view/:id').get( isAuthentication,authController.getView)  

router.route('/profile').get(isAuthentication,authController.getProfile).patch([check('name','The name must be 3+ char long').isLength({min:3}).notEmpty(),],authController.updateProfile)


module.exports=router