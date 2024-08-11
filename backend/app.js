const express = require("express");
require("dotenv").config();
require("./connection/connection");
const cors = require("cors");
const User = require("./routes/user");
const Cloth = require("./routes/cloth");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend side");
});

// Routes setup
app.use("/api/v1", User);
app.use("/api/v1", Cloth);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Creating port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started Successfully at PORT ${PORT}`);
});
