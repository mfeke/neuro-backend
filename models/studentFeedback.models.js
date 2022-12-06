// const { default: mongoose } = require("mongoose");
module.exports = mongoose => {
    var  feedback= mongoose.Schema({
        userId: String,
        userName: String,
        userFullName: String,
        Ans: String,
    }, {timestamps: true});
    feedback.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Feedback = mongoose.model("feedback", feedback)
    return Feedback;
}