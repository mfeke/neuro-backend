const express = require("express");
const cors = require("cors");
const app = express();


var corsOptions = {
    origin: "http://localhost:8081",
  };
 


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const db = require("./models");
const Role = db.role;
var dbConfig = require("./config/db.config");


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "student",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "teacher",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'teacher' to roles collection");
        });
        new Role({
          name: "admin",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Neuro Tutorial application." });
  });


  require("./routes/auth.routes")(app);
 
  const PORT = process.env.PORT || 4040;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  