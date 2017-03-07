import searchResultsReducer from "../../reducers/searchResults-reducer";
import {expect} from "chai";

describe("searchResults-reducer", () => {

  it("should return default state of an empty array", () => {
    expect(searchResultsReducer(undefined, {})).eql([])
  })

  it("should return an array containing one favorite that's the same as action.favorite", () => {
    const searchResults = [{id: "13", title: "catan"}];
    const action = {
      type: "SEARCH_RESULTS",
      searchResults
    }
    expect(searchResultsReducer(undefined, action)).eql(searchResults);
  })

  it("should return an array containing the favorites that was already in the array and the favorite that's in action.favorite", () => {
    const state = [{id: "test",  title: "title test"}]
    const searchResults = [{id: "13", title: "catan"}, {id: "9873", title: "pandemic"}];
    const action = {
      type: "SEARCH_RESULTS",
      searchResults
    }
    const expected = [...state, ...searchResults]
    expect(searchResultsReducer(state, action)).eql(expected);
  })

  it("should clear search results", () => {
    const state = [{id: "test",  title: "title test"}, {id: "13", title: "catan"}, {id: "9873", title: "pandemic"}];
    const action = {
      type: "CLEAR_SEARCH_RESULTS",
    }
    expect(searchResultsReducer(state, action)).eql([]);
  })
})
