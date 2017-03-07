import recommendationsReducer from "../../reducers/recommendations-reducer";
import {expect} from "chai";

describe("recommendations-reducer", () => {

  it("should return default state of an empty array", () => {
    expect(recommendationsReducer(undefined, {})).eql([])
  })

  it("should return an array equal to the length of action.hotness if GET_RECOMMENDATIONS is the action type", () => {
    const recommendations = [{id: "13", title: "catan"}, {id: "1234", title: "test"}];
    const action = {
      type: "GET_RECOMMENDATIONS",
      recommendations
    }
    expect(recommendationsReducer(undefined, action)).to.have.lengthOf(2);

    expect(recommendationsReducer(undefined, action)).eql(recommendations);
  })
})
