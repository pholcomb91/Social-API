const { ObjectId } = require('bson');
const { User } = require('../models');

module.exports = {
    addFriend( req, res ) {
        User.findOneAndUpdate(
            { _id: ObjectId(req.params.userId) },
            { $addToSet: { friends: req.body.userId }},
            { new: true }
        )
        .then((user) =>
            !user
                ? res.status(405).json({ message: 'No user with that ID to add a friend to' })
                : res.json('Success: Friend added!')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}