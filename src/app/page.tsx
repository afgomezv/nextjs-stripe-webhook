import ButtonCheckout from "@/components/ButtonCheckout"
import { products } from "@/data/products"


function page() {
  return (
    <div className="py-10 px-20">
      <h1 className="text-3xl font-bold text-center m-10">Productos</h1>

      <div className="grid grid-cols-3 gap-10">
        {
          products.map(product => (
            <div 
              key={product.id}
              className="bg-slate-100 text-center p-8 rounded-lg shadow-md"
            >
              <h2 className="font-bol text-lg">{product.name}</h2>
              <p className="text-2xl font-bold">${product.price / 100}</p>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full" 
                />
                <ButtonCheckout product={product}/>
            </div>
          ))
        }
      </div>


    </div>
  )
}

export default page