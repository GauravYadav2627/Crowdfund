import React from 'react'

const Stripe = () => {
  return (
    <div>
      <form action="https://localhost:7193/Checkout" method ="POST">
        <button type="submit">Checkout</button>
      </form>
    </div>
  )
}

export default Stripe
