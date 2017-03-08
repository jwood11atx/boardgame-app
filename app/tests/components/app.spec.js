// import React from 'react';
// import {mount} from 'enzyme';
// import AppComponent from '../../components/App/App';
// import {Provider} from 'react-redux';
// import configureMockStore from 'redux-mock-store';
// import sinon from "sinon";
// import jest, {fn} from "jest";
//
// const fakeStore = configureMockStore()({ user: null })
//
// window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
//
//
// // const fetch = () => {
// //   [{id: "13", title: "catan"}]
// // }
//
// const setup = () => {
//   // const props = {
//   //   fetchMovies: jest.fn(),
//   //   getUser: jest.fn(),
//   //   getFavorites: jest.fn(),
//   //   resetFavorites: jest.fn()
//   // }
//   // const fetch = jest.fn();
//   window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
//
//   const wrapper = mount(
//     <Provider store={fakeStore}>
//       <App />
//     </Provider>
//   )
//
//   const Component = wrapper.find(App)
//
//   return {
//     props,
//     Component
//   }
// }
//
// describe('components', () => {
//   describe('App', () => {
//
//     it("calls componentDidMount", () => {
//       sinon.spy(AppComponent.prototype, "componentDidMount");
//       const wrapper = mount(<AppComponent store={fakeStore}/>);
//       expect(AppComponent.prototype.componentDidMount.calledOnce).to.equal(true);
//     })
//
//     // const wrapper = mount(
//     //   <Provider store={fakeStore}>
//     //     <AppComponent />
//     //   </Provider>
//     // )
//     //
//     // it('should render something', () => {
//     //     const { Component } = setup()
//     //
//     //     expect(Component.length).toEqual(1)
//     //   })
//
//   })
// })
