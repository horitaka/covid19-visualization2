import React from 'react';

import Table from '../Table/Table'
import Login from '../Login'

function Admin(props) {
  const {isAdmin} = props

  return (
    <>
      {isAdmin ? <Table /> : <Login />}
    </>
  );
}

export default Admin;
