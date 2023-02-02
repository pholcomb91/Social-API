const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const friendRoutes  = require('./friendRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/friends', friendRoutes);

module.exports = router;