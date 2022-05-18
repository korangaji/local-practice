import { DEPOSIT_M,WITHDRAW_M, CHANGE } from "../actionTypes";
const initialState = {
    editText:false
}


export const textReducer = (state=initialState, action) => {
 switch (action.type){
      case CHANGE:
          return {
              ...state,
              editText:action.editText
          };
          default:
          return state

          
          
 }
}
 