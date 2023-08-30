import 'dotenv/config';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import expressPlayground from 'graphql-playground-middleware-express';
import { schema } from './schema/index.js';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { Clients } from './entities/Clients.js';
import { ClientTour } from './entities/ClientTour.js';
import { Expenses } from './entities/Expenses.js';
import { ExpensesTour } from './entities/ExpensesTour.js';
import { Managers } from './entities/Managers.js';
import { Tours } from './entities/Tours.js';
import { Transport } from './entities/Transport.js';


const PORT = process.env.PORT || 5000;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Clients, Managers, Tours, ClientTour, Expenses, ExpensesTour, Transport],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

const app = express();
app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    app.all(
      '/graphql',
      createHandler({
        schema,
      }),
    );
    app.use('/playground', expressPlayground.default({ endpoint: '/graphql' }));
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

export { AppDataSource };
