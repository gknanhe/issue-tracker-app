const express = require('express');
const router = express.Router();



const projectController = require('../controllers/projects_controller');
const issueController = require('../controllers/issue_controller');

router.post('/project', projectController.createProject);


router.get('/showProject/:id', issueController.showdata);

router.post('/issue', issueController.createIssue)

router.get('/searchRes/:searchText/:id', issueController.searchData)

router.get('/oldRes/:id', issueController.data)

router.get('/auther', issueController.auther);
router.get('/labels', issueController.label);


module.exports = router;