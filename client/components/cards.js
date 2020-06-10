import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/products'

const Cards = () => {
  const dispatch = useDispatch()
  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const symbols = {
    'USD' : '$',
    'EUR' : 'E',
    'CAD' : 'C'
  }
  return (
    <div className="flex flex-wrap content-center justify-center">
      {list.map((card) => {
        return (
          <div
            className="border-2 flex flex-col border-solid border-black w-64 h-64 p-2 m-4"
            key={card.id}
          >
            <div className="flex justify-center">
              <img className="h-32" src={card.image} alt={card.title} />
            </div>
            <div>{card.title} </div>
            <div>
              {card.price * (rates[base] || 1)} {symbols[base]}{' '}
            </div>

            <div className="flex p-10 justify-between">
              {' '}
              <button
                type="button"
                onClick={() => {
                  dispatch(removeSelection(card.id))
                }}
              >
                -
              </button>
              <div>{selection[card.id] || 0}</div>
              <button
                type="button"
                onClick={() => {
                  dispatch(addSelection(card.id))
                }}
              >
                +{' '}
              </button>{' '}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cards
