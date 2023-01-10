const { ObjectId } = require('bson');
const { User, Thought } = require('../models')

module.exports = {
    getUsers( req, res ) {
        User.findAll()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: ObjectId(req.params.userId) })
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No User with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser( req,res ) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            },
            {runValidators: true},
            {new: true},
        )
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    updateUser( req, res ) {
        User.findOneAndUpdate(
            {_id: ObjectId(req.params.userId)},
            {name: req.body.name, email: req.body.email},
            {runValidators: true},
            {new: true}
        )
        .then ((user) => 
            !user 
                ? res.status(404).json( message:'No user found with that ID' )
                : res.json(user)
        )
        .catch ((err) =>
            res.status(500).json(err)
        );
    },
    deleteUser( req, res ) {
        User.deleteOne( 
            {_id: ObjectId(req.params._id)},
            ( err, result ) => {
                if (err) throw err;
                console.log(result);
                res.send(result.deletedCount ? 'User deleted' : 'No user with that ID.');
            }
        ); 
    }
}
