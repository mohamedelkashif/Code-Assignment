import {combineReducers} from 'redux';
import apartmentsListReducer from './apartmentsListReducer';
import apartmentReducer from './apartmentReducer';


export default combineReducers({
    apartmentsList: apartmentsListReducer,
    apartmentItem: apartmentReducer,
})
