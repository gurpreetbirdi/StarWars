import React from 'react';
import SearchPage from './components/pages/SearchPage.js';
import App from './components/App';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

it('renders search without crashing', () => {
  const component = renderer.create(
      <SearchPage
        onLogOut={App.handleLogOut}
      />
    );
});

it('searchBoxOnChangeEvent', () => {

  const component = shallow(
      <SearchPage
        onLogOut={App.handleLogOut}
      />
    );
    component.find('.starWarsTextBox').simulate('onchange');
  });

it('planetButton', () => {

  const component = shallow(
      <SearchPage
        onLogOut={App.handleLogOut}
      />
    );
    component.find('.planets').simulate('onchange');
  });

it('specieButton', () => {

  const component = shallow(
      <SearchPage
        onLogOut={App.handleLogOut}
      />
    );
    component.find('.species').simulate('onchange');
  });

it('peopleButton', () => {

  const component = shallow(
      <SearchPage
        onLogOut={App.handleLogOut}
      />
    );
    component.find('.people').simulate('onchange');
  });

it('checkWookieButton', () => {

  const component = shallow(
      <SearchPage
        onLogOut={App.handleLogOut}
      />
    );
    component.find('.wookieCheckBox').simulate('onchange');
  });
