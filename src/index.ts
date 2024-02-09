import express, { Express, Request, Response } from "express";
import { errorHandler } from './middlewares/error.middleware';
import dotenv from "dotenv";
import "reflect-metadata"
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import { AppDataSource } from '../data-source';
const { auth } = require('express-oauth2-jwt-bearer');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const jwtCheck = auth({
  audience: 'http://vending-machine-sample.com',
  issuerBaseURL: 'https://dev-2xmuto8hk6gefwt3.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints except '/api/user/registration'
app.use(/^(?!\/api\/user\/registration$|\/docs\/).*$/, jwtCheck);

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