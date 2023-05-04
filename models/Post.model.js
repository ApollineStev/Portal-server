const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"]
        },
        description: {
            type: String,
            required: [true, "You have to post a text"]
        },
        genre: {
            type: String,
            required: false
        },
       /* userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "specify the userId"]
        }*/
    },
    {
        timestamps: true
    }
)

const Post = model("Post", postSchema);

module.exports = Post;