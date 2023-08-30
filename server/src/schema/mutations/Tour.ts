import { GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';

import { AppDataSource } from '../../index.js';
import { ExpensesTourInputType } from '../typeDefs/ExpensesTour.js';
import { ClientTourInputType } from '../typeDefs/ClientTour.js';
import { MessageType } from '../typeDefs/Message.js';
import { Tours } from '../../entities/Tours.js';
import { ExpensesTour } from '../../entities/ExpensesTour.js';
import { ClientTour } from '../../entities/ClientTour.js';

interface ExpenseInput {
  id: string;
  amount: number;
  description: string;
  expensesId: string;
}

interface ClientInput {
  id: string;
  clientId: string;
  paymentAmount: number;
  paymentDate: string;
  seatNumber: number | null;
}

export const CREATE_TOUR = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString, defaultValue: '' },
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    endDate: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLString, defaultValue: '' },
    cost: { type: GraphQLInt, defaultValue: null },
    managerId: { type: GraphQLString },
    insurance: { type: GraphQLString, defaultValue: '' },
    touristsList: { type: new GraphQLList(ClientTourInputType) },
    seats: { type: GraphQLInt, defaultValue: null },
    transportId: { type: GraphQLString },
    color: { type: new GraphQLNonNull(GraphQLString) },
    expenses: { type: new GraphQLList(ExpensesTourInputType) },
  },
  async resolve(parent: any, args: any) {
    const { name, description, startDate, endDate, location, cost, managerId, insurance, seats, transportId, color } =
      args;

    // Create a new query runner
    const queryRunner = AppDataSource.createQueryRunner();

    // Establish real database connection using our new query runner
    await queryRunner.connect();

    // Lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      const newTour = new Tours();
      newTour.name = name;
      newTour.description = description || '';
      newTour.startDate = startDate;
      newTour.endDate = endDate;
      newTour.location = location || '';
      newTour.cost = cost || null;
      newTour.managerId = managerId || '';
      newTour.insurance = insurance || '';
      newTour.seats = seats || null;
      newTour.transportId = transportId || '';
      newTour.color = color;

      await queryRunner.manager.insert(Tours, newTour);

      const tourId = newTour.id;

      if (tourId) {
        args.expenses.map(async (expense: ExpenseInput) => {
          const newExpense = new ExpensesTour();
          newExpense.tourId = tourId;
          newExpense.expensesId = expense.expensesId;
          newExpense.description = expense.description;
          newExpense.amount = expense.amount;
          await queryRunner.manager.insert(ExpensesTour, newExpense);
        });

        args.touristsList.map(async (tourist: any) => {
          const newClientTour = new ClientTour();
          newClientTour.tourId = tourId;
          newClientTour.clientId = tourist.clientId;
          newClientTour.paymentAmount = tourist.paymentAmount;
          newClientTour.paymentDate = tourist.paymentDate;
          newClientTour.seatNumber = tourist.seatNumber;
          await queryRunner.manager.insert(ClientTour, newClientTour);
        });

        // Commit transaction now:
        await queryRunner.commitTransaction();
        return { successful: true, message: 'Tour added successfully' };
      } else {
        throw new Error('Error adding tour');
      }
    } catch (error) {
      // Since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new Error('Error adding tour');
    } finally {
      // You need to release query runner which is manually created:
      await queryRunner.release();
    }
  },
};

export const UPDATE_TOUR = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString, defaultValue: '' },
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    endDate: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLString, defaultValue: '' },
    cost: { type: GraphQLInt, defaultValue: null },
    managerId: { type: GraphQLString },
    insurance: { type: GraphQLString, defaultValue: '' },
    touristsList: { type: new GraphQLList(ClientTourInputType) },
    seats: { type: GraphQLInt, defaultValue: null },
    transportId: { type: GraphQLString },
    color: { type: new GraphQLNonNull(GraphQLString) },
    expenses: { type: new GraphQLList(ExpensesTourInputType) },
  },
  async resolve(parent: any, args: any) {
    const {
      id,
      name,
      description,
      startDate,
      endDate,
      location,
      cost,
      managerId,
      insurance,
      seats,
      transportId,
      color,
      expenses,
      touristsList,
    } = args;

    // Create a new query runner
    const queryRunner = AppDataSource.createQueryRunner();

    // Establish real database connection using our new query runner
    await queryRunner.connect();

    // Lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      const tour = await queryRunner.manager.find(Tours, { where: { id } });

      if (tour) {
        await queryRunner.manager.update(Tours, id, {
          name,
          description,
          startDate,
          endDate,
          location,
          cost,
          managerId,
          insurance,
          seats,
          transportId,
          color,
        });

        const expensesTour = await queryRunner.manager.find(ExpensesTour, { where: { tourId: id } });
        const expensesTourOfIds = expensesTour.map((item: ExpenseInput): string => item.id);
        const expensesOfIds = expenses.map((item: ExpenseInput): string => item.id);

        //Clearing the database of deleted tour expenses
        const expensesToDelete = expensesTour.filter((expense: ExpenseInput) => !expensesOfIds.includes(expense.id));

        // Update and create new tour expenses
        expenses.map(async (expense: ExpenseInput) => {
          if (expensesTourOfIds.includes(expense.id)) {
            await queryRunner.manager.update(ExpensesTour, expense.id, expense);
          } else {
            const newExpense = new ExpensesTour();
            newExpense.tourId = id;
            newExpense.expensesId = expense.expensesId;
            newExpense.description = expense.description;
            newExpense.amount = expense.amount;
            await queryRunner.manager.insert(ExpensesTour, newExpense);
          }
        });

        await queryRunner.manager.remove(ExpensesTour, expensesToDelete);

        const clientsTour = await queryRunner.manager.find(ClientTour, { where: { tourId: id } });
        const clientsTourOfIds = clientsTour.map((item: ClientInput): string => item.id);
        const clientsOfIds = touristsList.map((item: ClientInput): string => item.id);

        //Clearing the database of deleted tourists
        const clientsToDelete = clientsTour.filter((client: ClientInput) => !clientsOfIds.includes(client.id));

        // Update and create new tourists
        touristsList.map(async (client: ClientInput) => {
          if (clientsTourOfIds.includes(client.id)) {
            await queryRunner.manager.update(ClientTour, client.id, client);
          } else {
            const newClient = new ClientTour();
            newClient.tourId = id;
            newClient.clientId = client.clientId;
            newClient.paymentAmount = client.paymentAmount;
            newClient.paymentDate = client.paymentDate;
            newClient.seatNumber = client.seatNumber;
            await queryRunner.manager.insert(ClientTour, newClient);
          }
        });

        await queryRunner.manager.remove(ClientTour, clientsToDelete);

        // Commit transaction now:
        await queryRunner.commitTransaction();
        return { successful: true, message: 'Tour edited successfully' };
      } else {
        throw new Error('Error editing tour');
      }
    } catch (error) {
      // Since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new Error('Error editing tour');
    } finally {
      // You need to release query runner which is manually created:
      await queryRunner.release();
    }
  },
};

export const DELETE_TOUR = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;

    // Create a new query runner
    const queryRunner = AppDataSource.createQueryRunner();

    // Establish real database connection using our new query runner
    await queryRunner.connect();

    // Lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      const tour = await queryRunner.manager.find(Tours, { where: { id } });

      if (tour) {
        // Delete expenses that belonged to the tour
        const expensesTour = await queryRunner.manager.find(ExpensesTour, { where: { tourId: id } });
        await queryRunner.manager.remove(ExpensesTour, expensesTour);

        // Cleaning the tour from tourists
        const clientsTour = await queryRunner.manager.find(ClientTour, { where: { tourId: id } });
        await queryRunner.manager.remove(ClientTour, clientsTour);

        // Delete tour
        await queryRunner.manager.remove(Tours, tour);

        // Commit transaction now:
        await queryRunner.commitTransaction();
        return { successful: true, message: 'Tour deleted successfully' };
      } else {
        throw new Error('Error deleting tour');
      }
    } catch (error) {
      // Since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new Error('Error deleting tour');
    } finally {
      // You need to release query runner which is manually created:
      await queryRunner.release();
    }
  },
};
