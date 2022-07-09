import { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../firebase'
import { collection, getDocs, orderBy } from "firebase/firestore"

 const useProducts = (order) => {


    const [products, setProducts ] = useState([])
    
    const { firebase } = useContext(FirebaseContext)

    useEffect( () => {
    const fireFetch = async () => {
        try {
            const querySnapshot = await getDocs(collection(firebase.db, "products"), orderBy(order,'desc') );
            const dbProducts = querySnapshot.docs.map( doc => ({
                id: doc.id,
                ...doc.data()
            }));
               setProducts(dbProducts)
        }catch (err) {
            console.log(err);
        }
    }
        fireFetch()
},[])
    return {
        products
    }
}

export default useProducts
