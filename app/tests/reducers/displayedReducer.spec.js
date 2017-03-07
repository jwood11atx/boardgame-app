import displayedReducer from "../../reducers/displayed-reducer";
import {expect} from "chai";

describe("displayed-reducer", () => {

  it("should return default state of 10", () => {
    expect(displayedReducer(undefined, {})).eql(10)
  })

  it("should return an amount increased by 10, expects result to be 20 to 30", () => {
    const action = {
      type: "INCREASE_DISPLAY"
    }
    expect(displayedReducer(20, action)).eql(30);
  })

  it("should reset display amount to 10", () => {
    const action = {
      type: "RESET_DISPLAY"
    }
    expect(displayedReducer(30, action)).eql(10)
  })
})
