const { ObjectId } = require('bson');
const { Thought, User, Reaction } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.findAll()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: ObjectId(req.params.thoughtId) })
        .then((post) =>
            !post
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(post)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought( req, res ) {
        Thought.create(req.body)
        .then((thought) => {
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
    updateThought( req,res ) {
        Thought.findOneAndUpdate(
            { _id: ObjectId(req.params.thoughtId) },
            { thoughtText: req.body.thoughtText },
            { new: true }
        )
        .then ((thought) =>
            !thought
                ? res.status(404).json({ message:'No Thought found with that ID.' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought( req, res ) {
        Thought.deleteOne(
            { _id: ObjectId(req.params.id)},
            (err, result) => {
                if (err) throw err;
                console.log(result);
                res.send(result.deletedCount ? 'Thought deleted' : 'No thought with that ID.');
            }
        );
    },
    createReaction( req, res ) {
        Reaction.create(req.body)
        .then((reaction) => {
            return Thought.findOneAndUpdate(
                { _id: ObjectId(req.body.thoughtId) },
                { $addToSet: { reactions: reaction._id } },
                { new: true }
            )
        })
        .then((post) => 
            !Thought
                ? res
                    .status(404).json({ message: 'Reaction created, however no thought was found with that ID.' })
                : res  
                    .json({ message: 'Reaction created' })
        )
        .catch((err) => {
            console.error(err)
        });

    },
    deleteReaction( req, res ) {
        Reaction.deleteOne(
            {_id: ObjectId(req.body.id)},
            (err, result) => {
                if (err) throw err;
                res.send( results.deletedCount ? 'Reaction deleted' : 'No reaction found with that Id' );
            }
        )
    },
};