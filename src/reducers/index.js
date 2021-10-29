
   
import { ADD_WEATHER_DATA } from '../actions'
import { initialState } from '../store'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WEATHER_DATA: {
      
      return {
       
        ...state,
        cityWeather: action.payload,
      }
    }
   
    default:
      return state
  }
}

export default mainReducer

