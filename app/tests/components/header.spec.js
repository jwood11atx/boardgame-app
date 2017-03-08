import React from 'react';
import {mount} from 'enzyme';
import headerComponent from '../../components/Header/Header';
import {Provider} from 'react-redux';
import {expect} from "chai";


describe('<Header />', () => {

  it("component mounts", () => {
    const wrapper = mount(<headerComponent />);
    const component = wrapper.find("headerComponent");
    expect(component.length).eql(1);
  })
})
