import hotenessReducer from "../../reducers/hotness-reducer";
import {expect} from "chai";

describe("hotness-reducer", () => {

  it("should return default state of an empty array", () => {
    expect(hotenessReducer(undefined, {})).eql([])
  })

  it("should return an array equal to the length of action.hotness if GET_HOTNESS is the action type", () => {
    const hotness = [{id: "13", title: "catan"}, {id: "1234", title: "test"}];
    const action = {
      type: "GET_HOTNESS",
      hotness
    }
    expect(hotenessReducer(undefined, action)).to.have.lengthOf(2);
  })
})
