import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import {Formik} from "formik"
import {SignupForm} from "./App"
Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {

  it('renders Home Page', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
    const wrapper = shallow(<App />);

    expect(wrapper).toHaveLength(1);
    expect(renderer
      .create(wrapper)
      .toJSON()).toMatchSnapshot();
  });

  it('should render debug output', ()=>{
    const wrapper = shallow(<App />);
    expect(wrapper.find('#output')).toHaveLength(1)
  })

  it('should have error message field', ()=>{
    const wrapper = shallow(<SignupForm />);
    const test = wrapper.find(Formik).props().validate({email : "test"});
    expect(test).toEqual({email: "Invalid email address"})
    expect(test).toMatchSnapshot()
  })

});