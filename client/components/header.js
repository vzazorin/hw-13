import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBase, setStatus } from '../redux/reducers/products'

const Header = () => {
  const dispatch = useDispatch()
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)

  const list = useSelector((s) => s.products.list)
  const selection = useSelector((s) => s.products.selection)
  const getPrice = (id) => list.find((it) => it.id === id).price
  const numberOfItems = Object.values(selection).reduce((acc, rec) => acc + rec, 0)
  const sum = Object.entries(selection).reduce(
    (acc, [id, qty]) => acc + getPrice(id) * qty * (rates[base] || 1),
    0
  )

  return (
    <div>
      <button type="button" onClick={() => dispatch(setStatus('price'))}>
        $$
      </button>
      <button type="button" onClick={() => dispatch(setStatus('title'))}>
        A-z
      </button>
      {['CAD', 'USD', 'EUR'].map((it) => {
        return (
          <button
            key={it}
            type="button"
            className={`mx-4 ${base === it ? 'underline' : ''}`}
            onClick={() => {
              dispatch(setBase(it))
            }}
          >
            {it}
          </button>
        )
      })}
      <button type="button">
        <Link to="/basket">Basket</Link>
      </button>
      <div>{sum !== 0 && sum}</div>
      <div>{numberOfItems !== 0 && numberOfItems}</div>
    </div>
  )
}

export default Header
