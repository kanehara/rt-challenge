import React from 'react';
import App from './App';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<App/>);
});
