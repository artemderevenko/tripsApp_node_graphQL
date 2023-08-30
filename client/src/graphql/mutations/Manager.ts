import { gql } from "@apollo/client";

export const CREATE_MANAGER = gql`
  mutation CreateManager(
    $firstName: String!,
    $lastName: String!,
    $middleName: String!,
    $birth: String!,
    $sex: String!,
    $passport: String!,
  ) {
    managerData: createManager(
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

export const UPDATE_MANAGER = gql`
  mutation UpdateManager(
    $id: ID!,
    $firstName: String!,
    $lastName: String!,
    $middleName: String!,
    $birth: String!,
    $sex: String!,
    $passport: String!,
  ) {
    updateManager(
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

export const DELETE_MANAGER = gql`
  mutation DeleteManager($id: ID!) {
    deleteManager(id: $id) {
      successful
      message
    }
  }
`;
