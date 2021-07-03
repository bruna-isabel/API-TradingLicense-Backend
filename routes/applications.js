// Listings Routes
const express = require('express');
const {getApplications, getApplicationById, createApplication, updateApplication, deleteApplication} = require('../controllers/applications.js');
const {validateApplication} = require('../controllers/validation');

const router = express.Router()

router.get('/', getApplications);
router.post('/', createApplication, validateApplication);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication, validateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
