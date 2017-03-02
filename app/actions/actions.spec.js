import * as actions from "./index";
import {expect} from 'chai';


describe("actions", () => {

  it("should get list of hot games", () => {
    const hotness = [{id: "13", title: "catan"}, {id: "1234", title: "test"}];
    const expectedReturn = {
      type: "GET_HOTNESS",
      hotness
    }
    expect(actions.getHotness(hotness)).eql(expectedReturn);
  })
})
