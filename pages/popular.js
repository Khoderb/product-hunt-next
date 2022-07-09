import Layout from "../layout/Layout"
import ProductDetails from "../components/ProductDetails"
import useProducts from "../hooks/useProducts"

export default function Popular() {

  
  const { products } = useProducts('votes') 

  return (
    <div>
      <Layout>
        <div className="list-products">
          <div className="container">
            <ul className="bg-white">
              {products.map(product=>(
                <ProductDetails 
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}