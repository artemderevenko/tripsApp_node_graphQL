import { gql } from "@apollo/client";

export const GET_TOURS = gql`
  query GetTours {
    tours: getTours {
      id
      name
      startDate
      endDate
      location
      managerName
      touristsCount
      seats
      transportName
    }
  }
`;

export const GET_TOUR = gql`
  query GetTour($id: ID!) {
    tour: getTour(id: $id) {
      id
      name
      description
      startDate
      endDate
      location
      cost
      managerId
      insurance
      seats
      transportId
      color
      touristsList {
        id
        clientId
        paymentAmount
        paymentDate
        seatNumber
        firstName
        lastName
        middleName
        passport
      }
      expenses {
        id
        expensesId
        amount
        description
      }
    }
  }
`;

export const GET_TOURS_IN_DATE_RANGE = gql`
  query GetToursInDateRange($startDate: String!, $endDate: String!) {
    tours: getToursInDateRange(startDate: $startDate, endDate: $endDate) {
      id
      name
      startDate
      endDate
      color
    }
  }
`;
