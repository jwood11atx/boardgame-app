import * as actions from "./index";
import {expect} from 'chai';


describe("actions", () => {

  it("should fire getHotness action", () => {
    const hotness = [{id: "13", title: "catan"}, {id: "1234", title: "test"}];
    const expectedReturn = {
      type: "GET_HOTNESS",
      hotness
    }
    expect(actions.getHotness(hotness)).eql(expectedReturn);
  })

  it("should fire getSearchResults action", () => {
    const searchResults = [{id: "13", title: "catan"}, {id: "1234", title: "test"}]
    const expectedReturn = {
      type: "SEARCH_RESULTS",
      searchResults
    }
    expect(actions.getSearchResults(searchResults)).eql(expectedReturn);
  })

  it("should fire clearSearchResults action", () => {
    const expectedReturn = {
    type: "CLEAR_SEARCH_RESULTS"
    };

    expect(actions.clearSearchResults()).eql(expectedReturn);
  })

  it("should fire getSearchIDs action", () => {
    const searchIDs = [1,2,3,5]
    const expectedReturn = {
      type: "SEARCH_IDS",
      searchIDs
    }
    expect(actions.getSearchIDs(searchIDs)).eql(expectedReturn);
  })

  it("should fire clearSearchIDs action", () => {
    const expectedReturn = {
    type: "CLEAR_SEARCH_IDS"
    };

    expect(actions.clearSearchIDs()).eql(expectedReturn);
  })

  it("should fire incDisplayed action", () => {
    const expectedReturn = {
    type: "INCREASE_DISPLAY"
    };

    expect(actions.incDisplayed()).eql(expectedReturn);
  })

  it("should fire resetDisplayed action", () => {
    const expectedReturn = {
    type: "RESET_DISPLAY"
    };

    expect(actions.resetDisplayed()).eql(expectedReturn);
  })

  it("should fire addFavoriteIDs action", () => {
    const favoriteIDs = [1,2,3,5]
    const expectedReturn = {
      type: "ADD_FAVORITE_ID",
      favoriteIDs
    }
    expect(actions.addFavoriteIDs(favoriteIDs)).eql(expectedReturn);
  })

  it("should fire addFavorite action", () => {
    const favorite = [{id: "13", title: "catan"}];
    const expectedReturn = {
      type: "ADD_FAVORITE",
      favorite
    }
    expect(actions.addFavorite(favorite)).eql(expectedReturn);
  })

  it("should fire getRecommendations action", () => {
    const recommendations = [{id: "13", title: "catan"}, {id: "1234", title: "test"}];
    const expectedReturn = {
      type: "GET_RECOMMENDATIONS",
      recommendations
    }
    expect(actions.getRecommendations(recommendations)).eql(expectedReturn);
  })

  it("should fire getBGDetails action", () => {
    const bgDetails = [{id: "13", title: "catan"}];
    const expectedReturn = {
      type: "GET_BGDETAILS",
      bgDetails
    }
    expect(actions.getBGDetails(bgDetails)).eql(expectedReturn);
  })
})
