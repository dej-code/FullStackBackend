require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const departmentRoutes = require("./routes/departmentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

app.use(require("./middleware/authMiddleware").router);

app.use(express.json());
app.use(helmet());
app.use(cors());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
});

app.use("/users", apiLimiter);

app.use("/departments", departmentRoutes);
app.use("/faculties", facultyRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
