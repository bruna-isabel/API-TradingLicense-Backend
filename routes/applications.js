// Listings Routes
const express = require('express');

const {authenticateToken} = require('../controllers/auth.js');
const {getApplications, getApplicationById, createApplication, updateApplication, deleteApplication} = require('../controllers/applications.js');

const router = express.Router()

router.get('/', getApplications, authenticateToken);
router.post('/', createApplication);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
