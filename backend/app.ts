import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as Knex from "knex";
import * as cors from "cors";

import * as KnexConfig from "./knexfile";

import UsersRouter from "./routers/UsersRouter";
import UsersService from "./services/UsersService";

dotenv.config();

const PORT = process.env.PORT || '8080';
const NODE_ENV = process.env.NODE_ENV || 'development';
const knex = Knex(KnexConfig[NODE_ENV]);

const app = express();

let usersService = new UsersService(knex);
let usersRouter = new UsersRouter(usersService);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/users", usersRouter.router());

app.listen(PORT,() => {
    console.log(`Application started at port: ${PORT}`);
});
