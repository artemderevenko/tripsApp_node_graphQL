import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query GetClients {
    clients: getClients {
      id
      firstName
      lastName
      middleName
      sex
      birth
      passport
    }
  }
`;
