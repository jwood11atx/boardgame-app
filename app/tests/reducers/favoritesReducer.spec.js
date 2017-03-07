import favoritesReducer from "../../reducers/favorites-reducer";
import {expect} from "chai";

describe("favorites-reducer", () => {

  it("should return default state of an empty array", () => {
    expect(favoritesReducer(undefined, {})).eql([])
  })

  it("should return an array containing one favorite that's the same as action.favorite", () => {
    const favorite = {id: "13", title: "catan"};
    const action = {
      type: "ADD_FAVORITE",
      favorite
    }
    const expected = [favorite]
    expect(favoritesReducer(undefined, action)).eql(expected);
  })

  it("should return an array containing the favorites that was already in the array and the favorite that's in action.favorite", () => {
    const state = [{id: "test",  title: "title test"}]
    const favorite = {id: "13", title: "catan"};
    const action = {
      type: "ADD_FAVORITE",
      favorite
    }
    const expected = [...state, favorite]
    expect(favoritesReducer(state, action)).eql(expected);
  })
})
