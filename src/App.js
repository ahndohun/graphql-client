import React from 'react';
import { ApolloProvider } from "react-apollo";
import { client } from './apollo-client'
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_PEOPLE = gql`
  query {
    people {
      id
      name
      username
    }
  }
`;

const DELETE_PERSON = gql`
  mutation($id: ID!) {
    deletePerson(id: $id)
  }
`;

function App() {

  const handleClick = (id) => {
    const { result } = client.mutate({
      mutation: DELETE_PERSON,
      variables: {
        id
      }
    })
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Query query={GET_PEOPLE}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error!</p>;
            return (
              <ul>
                {data.people.map(({ id, name, username }) => (
                  <li key={id}>
                  name: {name} <br/>
                  username: {username}
                  <button onClick={handleClick.bind(null, id)}>삭제</button>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    </ApolloProvider>
  );
}

export default App;
