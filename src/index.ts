import express, { Express, Request, Response } from "express";
import { errorHandler } from './middlewares/error.middleware';
import dotenv from "dotenv";
import "reflect-metadata"
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { AppDataSource } from '../data-source';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());    // to process only json requests

app.use(errorHandler);
app.use('/api', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
AppDataSource.initialize()
.then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(error => console.log(error));

app.listen(port, () => {
    console.log(`Sample app listening on port ${port} at http://localhost:${port}/`)
})