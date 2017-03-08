import React from 'react';
import {mount} from 'enzyme';
import searchComponent from '../../components/Search/Search';
import {Provider} from 'react-redux';
import {expect} from "chai";


describe('<Search />', () => {

  it("component mounts", () => {
    const wrapper = mount(<searchComponent />);
    const component = wrapper.find("searchComponent");
    expect(component.length).eql(1);
  })

  it("displays more button", () => {
    const wrapper = mount(<searchComponent />);
    const component = wrapper.find("searchComponent");

    const button = wrapper.find(".more-button");

    console.log(button);
    // console.log(wrapper.simulate("click"));
  })
})
