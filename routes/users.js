var express = require('express');
const { body } = require('express-validator');

const {
  saveUser,
  getUsers
} = require("../controllers/user-controller")

var router = express.Router();

/* GET users listing. */
router.post(
  '/',
  body("firstName")  
    .isString()
    .matches(new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/))
    .isLength({max: 30}),
  body("middleName")
    .optional()    
    .isString()    
    .isLength({max: 30}),
  body("lastName")
    .isString()
    .matches(new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/))
    .isLength({max: 30}),
  body("mothersLastName")
    .optional()
    .isString()    
    .isLength({max: 30}),
  body("dateOfBirth")
    .isString(),    
  body("phoneNumber")        
    .isLength({min: 7, max: 10})
    .matches(new RegExp(/^\d+$/)),
  body("email")    
    .isEmail()
    .isLength({max: 254}),
  saveUser);

router.get("/", getUsers)

module.exports = router;
