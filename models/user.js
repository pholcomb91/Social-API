const { Schema, model } = require('mongoose');
const thoughtSchema = require('./thought')

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
                },
                message: props => `Did you miss something? ${props.value} is not a valid email.`
            }

        },
        thoughts: [{
            type:Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type:Schema.Types.ObjectId,
            ref: 'friend'
        }],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;