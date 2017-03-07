import favoritesIDsReducer from "../../reducers/favoritesIDs-reducer";
import {expect} from "chai";

describe("favoritesIDs-reducer", () => {

  it("should return default state of an empty array", () => {
    expect(favoritesIDsReducer(undefined, {})).eql([])
  })

  it("should return an array containing one favorite id that's the same as action.favoriteIDs", () => {
    const favoriteIDs = 123;
    const action = {
      type: "ADD_FAVORITE_ID",
      favoriteIDs
    }
    const expected = [favoriteIDs]
    expect(favoritesIDsReducer(undefined, action)).eql(expected);
  })

  it("should return an array containing the favorites IDs that was already in the array and the favorite ID that's in action.favoriteIDs", () => {
    const state = [123, 456]
    const favoriteIDs = 789;
    const action = {
      type: "ADD_FAVORITE_ID",
      favoriteIDs
    }
    const expected = [...state, favoriteIDs];
    expect(favoritesIDsReducer(state, action)).eql(expected);
  })
})
