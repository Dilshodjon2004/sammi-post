require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookierParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || "*", // Use env variable for allowed origins
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If you need to allow cookies across origins
  }),
);
app.use(express.json());
app.use(cookierParser({}));
app.use(express.static("static"));
app.use(fileUpload({}));

// Routes
app.use("/api/post", require("./routes/post.route"));
app.use("/api/auth", require("./routes/auth.route"));

app.get("/", (req, res) => {
  res.json({message: "Hello Wolrd from backend"});
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

// const bootstarp = async () => {
//   try {
//     await mongoose
//       .connect(process.env.DB_URL)
//       .then(() => console.log("Connected to DB"));
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.log(`Error connecting with DB: ${error}`);
//   }
// };

// bootstarp();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Mongodb connected");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log({err});
    process.exit(1);
  });
