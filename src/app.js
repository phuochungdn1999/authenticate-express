require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth.route");
const { expressJWT } = require("./utils/jwt");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(expressJWT());

app.use("/api/auth", authRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
