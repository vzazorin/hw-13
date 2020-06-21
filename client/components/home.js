import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './header'
import Cards from './cards'
import { getProducts, getRates } from '../redux/reducers/products'

// import wave from '../assets/images/wave.jpg'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  }, [])

  return (
    <div>
      <Header />
      <Cards />
    </div>
  )
}

Home.propTypes = {}

export default Home
