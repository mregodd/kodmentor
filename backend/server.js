const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const mentorRoutes = require('./routes/mentorRoutes');


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/mentors', mentorRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connection established!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Kodmentor API working! 🚀");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  Server running on port ${PORT}`);
});
