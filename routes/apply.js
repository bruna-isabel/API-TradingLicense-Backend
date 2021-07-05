// Listings Routes
const express = require('express');
const {getApplications, getApplicationById, createApplication, updateApplication, deleteApplication} = require('../controllers/applications.js');
const {validateApplication} = require('../controllers/validation');

const router = express.Router()

router.post('/', createApplication, validateApplication);

module.exports = router;