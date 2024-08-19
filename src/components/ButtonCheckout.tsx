'use client'

import type { Product } from "@/interfaces/product.interface"

interface Props {
  product: Product
}


const ButtonCheckout = ({ product }: Props) => {

  const handlePay = async( product: Product ) => {
    //console.log(product)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        },
    })
    const session = await res.json()
    window.location.href = session.url
  }

  return (
    <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
      onClick={() => handlePay(product)}
    >
      Pagar
    </button>
  )
}

export default ButtonCheckout
