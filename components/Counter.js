import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {increment} from '../redux/features/coins/coinSlice'

export default function Counter() {
  const count = useSelector((state) => state.coin.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
      </div>
    </div>
  )
}