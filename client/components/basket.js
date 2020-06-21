import React from 'react'
import { useSelector } from 'react-redux'
import Header from './header'
// import { addSelection, removeSelection } from '../redux/reducers/products'

const Basket = () => {
  // const dispatch = useDispatch()
  // const list = useSelector((s) => s.products.list)
  // const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const basket = useSelector((s) => s.products.basket)
  const basketValues = Object.values(basket)
  const symbols = {
    USD: '$',
    EUR: 'E',
    CAD: 'C'
  }
  return (
    <div className="flex flex-wrap content-center justify-center">
      <Header />
      {basketValues.map((card) => {
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
              {(card.price * (rates[base] || 1)).toFixed(2)} {symbols[base]}{' '}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Basket
