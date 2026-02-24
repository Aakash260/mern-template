import app from "./src/app.js";
import { ConnectDB } from "./src/db.config.js";
import router from "./src/routes.js";
import "colors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 1234;
ConnectDB();

app.use("/api/v1/", router);
app.listen(PORT, () => {
  console.log(`the app is listen to PORT:${PORT}`);
});
