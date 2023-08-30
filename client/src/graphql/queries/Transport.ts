import { gql } from "@apollo/client";

export const GET_TRANSPORT = gql`
  query GetTransport {
    transport: getTransport {
      id
      type
      name
      seats
    }
  }
`;
