import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { usersRouter } from "./routes/users";
import { createConnection } from "typeorm";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  /** Connecting to local database*/
  try {
    const connection = await createConnection();
    console.log("Connection to Database established");
  } catch (err) {
    console.log("DB Connection Error: " + err);
  }

  //options for cors midddleware
  const options: cors.CorsOptions = {
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
    ],
    credentials: true,
    // apply CORS on all the http methods
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    //allowed origin to make API call is http://localhost:3000
    origin: process.env.API_URL,
    preflightContinue: false,
  };

  //use cors middleware
  app.use(cors(options));
  // enable pre-flight
  app.options("*", cors(options));

  //user routes
  app.use("/users", usersRouter);

  //swagger setup
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();

export default app;
