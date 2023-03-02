const express = require('express');
const connectDatabase = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/user.routes');
const roomRoute=require("./controllers/room.routes")
require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
      })
)
app.use(bodyParser.text({ limit: '200mb' }));

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Homepage!');
  });

app.use("/user" , userRouter);
app.use("/room" , roomRoute);
  app.listen(process.env.PORT, async () => {
    try {
      await connectDatabase;
      console.log('Database connected!');
    } catch (err) {
      console.log(err);
    }
    console.log('Server listening at http://localhost:8080');
  });
  