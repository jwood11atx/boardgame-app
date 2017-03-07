import bgDetailsReducer from "../../reducers/bgDetails-reducer";
import {expect} from "chai";

describe("bgDetails-reducer", () => {

  it("should return default state of an empty object", () => {
    expect(bgDetailsReducer(undefined, {})).eql({})
  })

  it("should return an object matching the details in action.bgDetails", () => {
    const bgDetails = [{id: "13", title: "catan"}];
    const action = {
      type: "GET_BGDETAILS",
      bgDetails
    }
    expect(bgDetailsReducer(undefined, action)).eql(bgDetails);
  })
})
