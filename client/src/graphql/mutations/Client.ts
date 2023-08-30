import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $firstName: String!,
    $lastName: String!,
    $middleName: String!,
    $birth: String!,
    $sex: String!,
    $passport: String!,
  ) {
    clientData: createClient(
      firstName: $firstName,
      lastName: $lastName,
      middleName: $middleName,
      birth: $birth,
      sex: $sex,
      passport: $passport,
    ) {
      id
      firstName
      lastName
      middleName
      birth
      sex
      passport
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!,
    $firstName: String!,
    $lastName: String!,
    $middleName: String!,
    $birth: String!,
    $sex: String!,
    $passport: String!,
  ) {
    updateClient(
      id: $id,
      firstName: $firstName,
      lastName: $lastName,
      middleName: $middleName,
      birth: $birth,
      sex: $sex,
      passport: $passport,
    ) {
      successful
      message
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id) {
      successful
      message
    }
  }
`;
