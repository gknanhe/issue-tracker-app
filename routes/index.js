const express = require('express');
const router = express.Router();

console.log('router loaded');

const homeController = require('../controllers/home_controller')

router.get('/', homeController.home);

router.use('/create', require('./project'));
router.use('/createIssue', require('./project'));
router.use('/project', require('./project'))

router.use('/search', require('./project'));

router.use('/old', require('./project'));
router.use('/filter', require('./project'));
router.use('/filterlabel', require('./project'));


module.exports = router;