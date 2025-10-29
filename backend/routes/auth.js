const express = require('express');
const router = express.Router();
const { regisUser,userLogin } = require('../services/users');    
// POST /api/auth/register
router.post(
  '/register',regisUser);   
// POST /api/auth/login
router.post(
  '/login',userLogin);

module.exports = router;
