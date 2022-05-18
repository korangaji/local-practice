import React from 'react'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Action} from './Redux/Action/index'
import { useSelector } from 'react-redux'
import {changeText} from './Redux/Action/textAction'

export const Shop =()=> {
    const dispatch = useDispatch()
    const updateBar = useSelector(store=>store.textReducer.editText)
    const handleSubmit =(e)=>{
     e.preventDefault()
     console.log(e.target.value);
    }
    const showCLick = (e)=>{
        dispatch(changeText(!updateBar))
    }
  return (
    <div>
    {/* <form onSubmit={handleSubmit}> */}
      <h3>Withdraw and Deposit amount</h3>
      <a type='submit' onClick={(e)=>{dispatch(Action.withdrawMoney(100))}}>
        -
      </a>
      add to card
      <a type='submit'  onClick={(e)=>{dispatch(Action.depositMoney(100))}}>+</a>
      {/* </form> */}
      <input type="checkbox" onClick={(e)=>{showCLick(e)}}></input>
    </div>    
  );
}
