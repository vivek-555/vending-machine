import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata"
import routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Sample app listening on port ${port} at http://localhost:${port}/`)
})