import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path"
import MONGO_URI from "./key.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();


// To accept JSON data from the client
// use express.json() middleware instead of bodyParser.json()
// reference https://stackoverflow.com/questions/24543847/req-body-empty-on-posts
// @Asher
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

  mongoose.set("strictQuery", false)

  mongoose
  .connect(
    MONGO_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err, MONGO_URI));

const answerSchema = {
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  answer5: String,
  answer6: String,
  answer7: String,
  answer8: String,
  answer9: String,
  answer10: String,
  appCodeName: String,
  product: String,
  appVersion: String,
  cookiesEnabled: String,
  language: String,
  appName: String,
  onLine: String,
  userAgent: String,
  timeZoneOffset: String,
  timeZone: String,
  fonts: String,
  dnt: String,
  platform: String,
  maxTouchPoints: String,
  cpuClass: String,
  hardwareConcurrency: String,
  devMemory: String,
  plugins: String
};

const Answer = mongoose.model('Answer', answerSchema);

const moviesSchema = {
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  number: String
};

const Card = mongoose.model('Card', moviesSchema);




// Use express.static to serve static html files
// By default, it serves the index.html file
// So I replaced your index.html with your index0.html file
// The get() method is more suitable for responding JSON data
// I think because you send the whole html file back to the client
// the client cannot use relative paths to access the CSS and JavaScript files
// @Asher
///app.use(express.static(__dirname + '/'));


app.post('/answer', function (req, res) {
  console.log('Received a POST request', req.body);
  try {
    let newNote = new Answer(req.body);
    newNote.save();
    // If you want to refresh your page on the frontend, you can use the location.reload() method on the frontend
    // Use a send method to send a response to the client
    // @Asher
    res.send('OK');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => res.status(200).send("HELLO CLEVER PROGRAMMERS!!"))

app.get("/answer", (req, res) => {
  //   function to find a card
  Answer.find((err, data) => {
    // if there is error
    if (err) {
      // set response to 500, which means internal server error and send error back
      res.status(500).send(err);
    } else {
      // 200 means found
      res.status(200).send(data);
    }
  });
});

app.get("/card", (req, res) => {
  //   function to find a card
  Card.find((err, data) => {
    // if there is error
    if (err) {
      // set response to 500, which means internal server error and send error back
      res.status(500).send(err);
    } else {
      // 200 means found
      res.status(200).send(data);
    }
  });
});

const __dirname2 = path.resolve();

dotenv.config();




// Heroku automatically sets a Port that can be accessed via process.env.PORT. Setting a port yourself would crash your app.
// https://dev.to/lawrence_eagles/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl#:~:text=This%20error%20is%20thrown%20if,App%20crashed%20error%20code%20message
app.listen(process.env.PORT || 8080, function () {
  console.log(`server is running on ${process.env.PORT}`);
});
