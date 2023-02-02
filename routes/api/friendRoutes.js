const router = require('express').Router();
const {
    addFriend
} = require('../../controllers/usercontroller');

router.route('/:userId').put(addFriend);

module.exports = router;