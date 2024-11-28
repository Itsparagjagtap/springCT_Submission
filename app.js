const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.get("/", (req, res) => {
  res.send("Home page");
});

//For database connection
mongoose
  .connect(`mongodb://localhost:27017/companydb`, {
    useNewUrlParser: true,
    useUnifiedtopology: true,
  })
  .then(() => console.log("db is connected"))
  .catch((err) => console.log(err));

const companySchema = new mongoose.Schema({
  name: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: "company" }],
});

const Company = mongoose.model("Company", companySchema);
const User = mongoose.model("User", userSchema);

//APIs

app.use(bodyParser.json());

app.post("/companies", async (req, res) => {
  const { name, city } = req.body;
  const company = new Company({ name, city });
  await company.save();
  res.json(company);
});

app.post("/users", async (req, res) => {
  const { name, email, phone } = req.body;
  const users = new User({ name, email, phone });
  await users.save();
  res.json(users);
});

app.get("/user", async (req, res) => {
  const users = await Users.find();
  res.json(users);
});

app.delete("/companies/:companyId", async (req, res) => {
  const companyId = req.parms;
  await Company.find.findByIdAndDelete(companyId);
  res.json({ message: "Deleted the record" });
});

app.put("/users/:userId/companies", async (req, res) => {
  const userId = req.params;
  const companyIds = req.body.companyIds;
  const user = await User.findById(userId);
  user.companies = companyIds;
  await user.save();
  res.json(user);
});

app.get("/companies/:companyId/users", async (req, res) => {
  const companyId = req.params;
  const users = await User.find({ companies: companyId });
  res.json(users);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
