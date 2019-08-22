import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USER = gql`
  query {
    me {
      name
      email
    }
  }
`;

function App(props) {
  const { data, loading, error } = useQuery(GET_USER);
  if (loading) return <div>Loading</div>;
  if (error) return <p>ERROR</p>;
  const { me } = data;
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div>
      <div>{me.name}</div>
      <div>{me.email}</div>
      <input type="button" value="Logout" onClick={logout} />
    </div>
  );
}

export default App;
