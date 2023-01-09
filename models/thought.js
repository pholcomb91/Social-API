const { timeStamp } = require('console');
const { Schema, model, default: mongoose } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: [{type: Schema.Types.ObjectId, ref: 'id',}],
    reactionBody: {type: String, required: true, minLength: 1, maxLength: 280,},
    userName: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, timestamps: true}
})

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            timestamps: true,
        },
        userName: {
            type: String,
            required: true
        },

        reactions: [reactionSchema],
    },
    {     
        toJSON: {
                virtuals: true,
            }
    }
    );

thoughtSchema
    .virtual('reactionsCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.export = Thought;