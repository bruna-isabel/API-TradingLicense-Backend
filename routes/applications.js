// Listings Routes
const express = require('express');

const {getApplications, getApplicationById, createApplication, updateApplication, deleteApplication} = require('../controllers/applications.js');

const router = express.Router()

router.get('/', getApplications);
router.post('/', createApplication);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;