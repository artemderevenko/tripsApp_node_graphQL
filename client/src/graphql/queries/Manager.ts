import { gql } from "@apollo/client";

export const GET_MANAGERS = gql`
  query GetManagers {
    managers: getManagers {
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
