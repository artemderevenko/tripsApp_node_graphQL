import { gql } from "@apollo/client";

export const CREATE_TOUR = gql`
  mutation CreateTour(
    $id: ID
    $name: String!
    $description: String
    $startDate: String!
    $endDate: String!
    $location: String
    $cost: Int
    $managerId: String
    $insurance: String
    $touristsList: [ClientTourInput]
    $seats: Int
    $transportId: String
    $color: String!
    $expenses: [ExpensesTourInput]
  ) {
    createTour(
      id: $id
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      location: $location
      cost: $cost
      managerId: $managerId
      insurance: $insurance
      touristsList: $touristsList
      seats: $seats
      transportId: $transportId
      color: $color
      expenses: $expenses
    ) {
      successful
      message
    }
  }
`;

export const UPDATE_TOUR = gql`
  mutation UpdadeTour(
    $id: ID
    $name: String!
    $description: String
    $startDate: String!
    $endDate: String!
    $location: String
    $cost: Int
    $managerId: String
    $insurance: String
    $touristsList: [ClientTourInput]
    $seats: Int
    $transportId: String
    $color: String!
    $expenses: [ExpensesTourInput]
  ) {
    updateTour(
      id: $id
      name: $name
      description: $description
      startDate: $startDate
      endDate: $endDate
      location: $location
      cost: $cost
      managerId: $managerId
      insurance: $insurance
      touristsList: $touristsList
      seats: $seats
      transportId: $transportId
      color: $color
      expenses: $expenses
    ) {
      successful
      message
    }
  }
`;

export const DELETE_TOUR = gql`
  mutation DeleteTour($id: ID!) {
    deleteTour(id: $id) {
      successful
      message
    }
  }
`;