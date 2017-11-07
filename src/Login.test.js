import React from 'react';
import Login from './components/home/Login';
import App from './components/App';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';


it('renders App without crashing', () => {

  const component = renderer.create(
      <App/>
    );
});

it('renders Login without crashing', () => {
  const component = renderer.create(
      <Login
      onSubmit={App.handleSubmit}
      isLoading={false}
      error={false}
      />
    );
});

it('clicks login', () => {

  const component = shallow(
      <Login
      onSubmit={App.handleSubmit}
      isLoading={false}
      error={false}
      />
  );

  component.find('.starWarsButton').simulate('click');
});

it('makes on submit calls', () => {
  let handleSubmit = function(){

  }
  const component = shallow(
      <Login
      onSubmit={handleSubmit}
      isLoading={false}
      error={false}
      />
  );
  component.find('form').simulate('submit', { preventDefault() {} })
});
