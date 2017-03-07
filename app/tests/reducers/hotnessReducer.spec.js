import hotenessReducer from '../../reducers/hotness-reducer';
import {expect} from 'chai';


describe('hotness-reducer', () => {

  it('should return default state of an empty array', () => {
    expect(hotenessReducer(undefined, {})).toEqual([])
  })

  it('should return an array equal to the length of action.movies if LOAD_MOVIES is the action type', () => {
    const hotness = [{id: "13", title: "catan"}, {id: "1234", title: "test"}];
    const action = {
      type: "GET_HOTNESS",
      hotness
    }
    expect(hotenessReducer(undefined, action)).toHaveLength(3);
  })

})
