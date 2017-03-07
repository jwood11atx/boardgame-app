import searchIDsReducer from "../../reducers/searchIDs-reducer";
import {expect} from "chai";

describe("favoritesIDs-reducer", () => {

  it("should return default state of an empty array", () => {
    expect(searchIDsReducer(undefined, {})).eql([])
  })

  it("should return an array containing one search id that's the same as action.searchIDs", () => {
    const searchIDs = [123, 456, 789];
    const action = {
      type: "SEARCH_IDS",
      searchIDs
    }

    expect(searchIDsReducer(undefined, action)).eql(searchIDs);
  })

  it("should clear the ids in searchIDs", () => {
    const state = [123, 456, 789]
    const action = {
      type: "CLEAR_SEARCH_IDS",
    }
    expect(searchIDsReducer(state, action)).eql([]);
  })
})
