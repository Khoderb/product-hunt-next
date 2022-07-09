import Layout from "../layout/Layout"
import { Form, Field, InputSubmit, Errors } from "../ui/Form"
import useValidation from "../hooks/useValidation"
import validateNewProduct from '../validations/validateProduct'

import Error404 from "../components/404"

//Firebase
import { useContext, useState } from "react"
import { FirebaseContext } from "../firebase/context"
  //Router
import { useRouter } from "next/router"
import { addDoc, collection} from "firebase/firestore"

import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';

export default function NewProduct() {


  const router = useRouter()
  const [error, setError] = useState(false)
  const [img, setImg] = useState(null)
  const [urlImg, setUrlImg] = useState('')

  const { user, firebase } = useContext(FirebaseContext)

  const initialState = {
    name: "",
    enterprise: "",
    image:"",
    url:"",
    description: ""
  }

  const { 
        handleSubmit,
        errors,
        values,
        handleChange,
        handleOnBlur,
        
      } = useValidation(initialState, validateNewProduct, newProduct)

  const { name, enterprise, description, image, url } = values;

  const handleFile = e =>{
    if(e.target.files[0]){
      setImg(e.target.files[0])
    }
  }

  

    
  async function newProduct() {
    if(!user){
      return router.push('/login')
    }
    setUrlImg(await handleUrl())
    if(urlImg!==''){

      const product = {
        name,
        enterprise,
        url,
        urlImg,
        description,
        votes:0,
        coments: [],
        createdAt: Date.now(),
        creator:{
          name: user.displayName,
          id: user.uid
        },
        hasVoted: []
    }
    try {
      //create collection with new product
      console.log(product)
      await addDoc(collection(firebase.db, "products"), product);
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
        setImg(null)
      }
    }
  }

  const handleUrl = async ()=> {
    //upload img nad get URL
      const storageRef =  ref(firebase.storage,'products/'+img.name)
      await uploadBytes(storageRef, img)
      getDownloadURL(storageRef)
        .then(url=>{
          setUrlImg(url)
        })
        return urlImg
    }
   
  return (

    <div>
      <Layout>
        {!user ? <Error404 /> :
          <>
            <h1
              style={{textAlign: 'center',
                      marginTop:'3rem',
                      textTransform: 'uppercase',
                    }}>New Product
            </h1>
              <Form
                onSubmit={handleSubmit}
                noValidate
              > 
                  <h4>Product General Info</h4>
                  <Field>
                  <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="your name"
                      value={name}
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      />
                  </Field>
                    {errors.name && <Errors>{errors.name}</Errors>}
                  <Field>
                  <label htmlFor="enterprise">Enterprise</label>
                    <input
                      type="text"
                      id="enterprise"
                      name="enterprise"
                      placeholder="Enterprise"
                      value={enterprise}
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      />
                  </Field>
                  {errors.enterprise && <Errors>{errors.enterprise}</Errors>}
                  <Field>
                  <label htmlFor="image">Image</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onInput={(e) => handleFile(e)}
                      />
                  </Field>
                  <Field>
                  <label htmlFor="url">URL</label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      placeholder="URL product"
                      value={url}
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      />
                  </Field>
                  {errors.url && <Errors>{errors.url}</Errors>}
                  <h4>About the product</h4>
                  <Field>
                  <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Describe the product..."
                      value={description}
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      />
                  </Field>
                  {errors.description && <Errors>{errors.description}</Errors>}
                  {error && <Errors>{error}</Errors>}
                  
                <Field>
                    <InputSubmit
                      type="submit"
                      value="Add Product"
                      />
                </Field>
              </Form>
            </>
        }
      </Layout>
    </div>
  )
}