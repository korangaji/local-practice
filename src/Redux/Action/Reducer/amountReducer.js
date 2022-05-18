import { DEPOSIT_M,WITHDRAW_M, CHANGE } from "../actionTypes";
const initialState= {
    // deposit:0,
    amount:0,
}

export const amountReducer = (state=0, action )=>{
    // switch (action.type){
    //     case DEPOSIT_M:
    //     return {
    //         ...state,
    //         deposit:action.deposit
    //     }
    //     case WITHDRAW_M:
    //         return {
    //             ...state,
    //             withdraw:action.withdraw
    //         }

    // }
    if (action.type === 'deposit'){
        return state + action.payload;
    }
    else if (action.type === 'withdraw'){
        return state-action.payload;
    }
    else 
    return state;

}