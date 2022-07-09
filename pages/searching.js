import Layout from "../layout/Layout"
import { useRouter } from 'next/router'
import ProductDetails from "../components/ProductDetails";
import useProducts from "../hooks/useProducts";
import { useEffect, useState } from "react";

export default function Searching() {

  const {products }= useProducts('createdAt')
  const [results, setResults] = useState([])

  const router = useRouter();
  const { q }  = router.query
  
  useEffect(()=>{
    const ref = q.toLowerCase();
    const filter = products.filter(product=> {
    return(
      product.name.toLowerCase().includes(ref) || 
      product.description.toLowerCase().includes(ref)
    )
  })
    setResults(filter)
  },[q, products]);

  return (
    <div>
      <Layout>
        <div className="list-products">
          <div className="container">
            <ul className="bg-white">
              {results.map(product=>(
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
