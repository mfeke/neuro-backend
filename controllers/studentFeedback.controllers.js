const { feedback } = require("../models");
const db = require("../models")

const Feedback = db.feedback;

const Role =  db.role;

exports.createafeedback = (req, res) =>{
    const feedback = new Feedback({
        userId: req.userId,
        userName: req.userName,
        userFullName:req.userFullName,
        ans: req.body.ans
    })

    feedback.save(feedback).then(data =>{
        res.send(data)
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product"
        });
    })
}
exports.findAll = (req, res) => {
    const ans = req.query.ans;
  
    var condition = ans ? {ans: { $regex: new RegExp(ans), $options: "i" } } : {};
  
    Feedback.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occured while retriveing products"
        });
      });
  };
  

exports.findOne = (req, res) =>{
    const id = req.params.id;
    Feedback.findById(id)
    .then(data =>{
        if(!data)
        res.status(404).send({ message: "Not found Product with id " + id });
        else res.send(data);
    })
}

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;
    Feedback.findByIdAndUpdate(id,req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Product with id=${id}. Maybe Product was not created!`
          });
        } else res.send({ message: "Post was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating the Post with id=" + id
        });
    });
}