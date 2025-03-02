import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { useAuth } from "./context/AuthContext"; // Update the import to .ts or .tsx
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Define the props for the ApolloSetup component
interface ApolloSetupProps {
  children: ReactNode;
}

const ApolloSetup: React.FC<ApolloSetupProps> = ({ children }) => {
  const { token } = useAuth(); // Get token from AuthContext

  // Create an Apollo Link to set the authorization header
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
      "x-portal-type": "student",
    },
  }));

  // Create an HTTP link to connect to the GraphQL server
  const httpLink = new HttpLink({
    uri: "http://localhost:2323/graphpl",
  });

  // Create the Apollo Client instance
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloSetup;
