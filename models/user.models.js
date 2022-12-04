const { default: mongoose } = require("mongoose");

module.exports = mongoose =>{
    const user =new mongoose.Schema({
        username: String,
        email: String,
        schoolName:String,
        password: String,
        image: {
            type: String,
            required: true,
            default: 'https://i.postimg.cc/L4YXpf8J/f10ff70a7155e5ab666bcdd1b45b726d.jpg'
        },
        phone: {
            required: true,
            type: Number,
            default: 0
        },
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
    user.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model('users', user)

    return User

}
