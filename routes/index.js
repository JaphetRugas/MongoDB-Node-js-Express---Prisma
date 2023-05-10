var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* GET home page. */
router.get('/', async function(req, res, next) {
  var students = await prisma.student_info.findMany();
  
  res.render('index', { title: 'Express', students: students });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* POST login page. */
router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });
  if (user && user.password === password) {
    res.redirect('/');
  } else {
    res.render('login', { title: 'Login', error: 'Invalid username or password.' });
  }
});

module.exports = router;