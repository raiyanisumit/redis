const express = require("express");
const bodyparser = require("body-parser");
const app = express();
require('./db/conn');
const cors = require("cors");
const router = require("./Route/employee_route");

app.use("*", cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/" , router)

const PORT = 8000;
app.listen(PORT, () => console.log(`server running on ${PORT}!`));
