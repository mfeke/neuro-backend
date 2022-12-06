const { authJwt } = require("../middleware"); 

const feedbackControllers = require("../controllers/studentFeedback.controllers")

module.exports = (app) =>{
    app.use(
        (req, res, next)=>{
            res.header(
                "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        }
    )
    app.post("api", [authJwt.verifyToken, authJwt.isTeacher], feedbackControllers.createafeedback)
    app.post("api/create/feedback",feedbackControllers.createafeedback)
}