module.exports = mongoose => {
    var posts = mongoose.Schema({
        userId: String,
        userName: String,
        text: String,

    }, {timestamps: true});
    posts.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Post = mongoose.model("posts", posts)
    return Post;  
}
