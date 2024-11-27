const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/some-data', (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});