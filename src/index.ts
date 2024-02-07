import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata"
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());    // to process only json requests

app.use('/api', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
    console.log(`Sample app listening on port ${port} at http://localhost:${port}/`)
})