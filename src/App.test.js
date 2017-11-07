/**
 * @jest-environment node
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {shallow} from 'enzyme';

it('makes login API calls', () => {

  const component = shallow(
      <App/>
  );
  component.instance().handleSubmit('Luke Skywalker','19BBY');
});

it('handles logout click', () => {

  const component = shallow(
      <App/>
  );
  component.instance().handleLogOut();
});
