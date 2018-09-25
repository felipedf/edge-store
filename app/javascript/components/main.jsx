import React from 'react';

import Layout from './Layout/layout';
import Dashboard from '../containers/Dashboard/dashboard';
import '../styles/main.sass';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

const Main = (props) => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
};

export default Main;
