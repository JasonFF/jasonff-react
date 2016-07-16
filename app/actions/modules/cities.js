import {fetchGet} from 'widgets';

const CITIES = "CITIES";

const initialState = {
  loaded: false
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case CITIES:
      return {
        data: action
      };
    default:
      return state;
  }
}
function resCities(json) {
  return {
    type: CITIES,
    cities: json
  }
}

export function reqCities() {
  return dispatch => {
    fetchGet('citiesImages').then(res=>res.json()).then(json=>dispatch(resCities(json)))
  }
}
