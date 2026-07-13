require("dotenv").config();
const app = require("./src/app");
const ConnectDB = require("./src/config/db");
const invokeGeminiApi = require("./src/services/ai.service");

ConnectDB();
invokeGeminiApi();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
