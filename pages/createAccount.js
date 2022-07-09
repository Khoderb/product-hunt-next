import Layout from "../layout/Layout"
import { Form, Field, InputSubmit, Errors } from "../ui/Form"
import useValidation from "../hooks/useValidation"
import validateCreateAccount from '../validations/validateCreateAccount'


//Firebase
import firebase from "../firebase"
import { useState } from "react"

//Router
import { useRouter } from "next/router"


export default function CreateAccount() {


  const router = useRouter()
  const [error, setError] = useState(false)

  const initialState = {
    name: "",
    email: "",
    password: ""
  }
  const { handleSubmit, errors, values, handleChange, handleOnBlur } = useValidation(initialState, validateCreateAccount, createAccount)

  const { name, email, password } = values;

  async function createAccount() {
    try {
      await firebase.registry(name, email, password)
      router.push('/')
    }catch(error) {
      //To evoit the message of Firebase
      if(error){
        const message = 'User already exists';
        setError(message)
        setTimeout(() => {
          setError(false)
        }, 3000)
      }
    }
  }

  return (
    <div>
      <Layout>
        <>
        <h1
          style={{textAlign: 'center',
                  marginTop:'3rem',
                  textTransform: 'uppercase',
                }}>Create Account
        </h1>
          <Form
            onSubmit={handleSubmit}
            noValidate
          >
            {errors.name && <Errors>{errors.name}</Errors>}
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
            {errors.email && <Errors>{errors.email}</Errors>}
            {error && <Errors>{error}</Errors>}
            <Field>
              <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleOnBlur}
                />
            </Field>
            {errors.password && <Errors>{errors.password}</Errors>}
            <Field>
              <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="your password"
                  value={password}
                  onChange={handleChange}
                />
            </Field>
            <Field>
                <InputSubmit
                  type="submit"
                  value="Create Account"
                />
            </Field>
          </Form>
        </>
      </Layout>
    </div>
  )
}