const { ObjectId } = require('bson');
const { User, Thought} = require('../models');

module.exports = {
    getUsers( req, res ) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No User with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser( req,res ) {
        User.create({
            userName: req.body.userName,
            email: req.body.email,
            },
            {runValidators: true},
            {new: true},
        )
        .then((user) => {
            console.log(user)
            res.json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    updateUser( req, res ) {
        console.log("update User")
        User.findOneAndUpdate(
            {_id: ObjectId(req.params.userId)},
            {userName: req.body.name, email: req.body.email},
            {runValidators: true},
            {new: true}
        )
        .then ((user) => 
            !user 
                ? res.status(404).json({ message: 'No user found with that ID' })
                : res.json(user)
        )
        .catch ((err) =>
            res.status(500).json(err)
        );
    },
    deleteUser( req, res ) {
        User.deleteOne( 
            {_id: ObjectId(req.params.userId)},
            ( err, result ) => {
                if (err) throw err;
                console.log(result);
                res.send(result.deletedCount ? 'User deleted' : 'No user with that ID.');
            }
        ); 
    },
    createThought( req, res ) {
        console.log("createThought running")
        Thought.create({
            thoughtText: req.body.thoughtText
        })
        .then((thought) => {
            console.log(thought);
            return User.findOneAndUpdate(
                { _id: ObjectId(req.params.userId) },
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            );
        })
        .then((user) =>
            !user
                ? res.status(405).json({ message: 'Thought posted but no user with that ID' })
                : res.json('Success: Posted the Thought!')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    addFriend( req, res ) {
        console.log("addFriend ran")
        User.findOneAndUpdate(
            {_id: ObjectId(req.params.userId)},
            {$addToSet: { friends: req.body.userId }},
            {new: true}
        )
        .then ((user) => 
            !user
                ? res.status(404).json({ message: 'No user found by that Id.' })
                : res.json(user)
        )
        .catch ((err) => 
            res.status(500).json(err)
        )
    },
}
