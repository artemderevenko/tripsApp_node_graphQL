import { gql } from "@apollo/client";

export const GET_EXPENSES = gql`
  query GetExpenses {
    expenses: getExpenses {
      id
      type
      name
      color
    }
  }
`;
