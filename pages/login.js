import Layout from "../layout/Layout"
import { Form, Field, InputSubmit, Errors } from "../ui/Form"
import useValidation from "../hooks/useValidation"
//Firebase
import { FirebaseContext } from "../firebase"
import { useState, useContext } from "react"

//Router
import { useRouter } from "next/router"
import validateLogin from "../validations/validateLogin"



export default function Login() {
  const { firebase } = useContext(FirebaseContext)
  const router = useRouter()
  const [error, setError] = useState(false)

  const initialState = {
    email: "",
    password: ""
  }
  const { handleSubmit, errors, values, handleChange, handleOnBlur } = useValidation(initialState, validateLogin, login)

  const { email, password } = values;

  async function login() {
    try {
        await firebase.login( email, password)
        router.push('/')
    } catch(error) {
    //To evoit the message of Firebase
        const message = "Wrong Password or Email" 
        setError(message)
        setTimeout(() => {
          setError(false)
        }, 3000)
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
                      }}>Log in
              </h1>
                <Form
                  onSubmit={handleSubmit}
                  noValidate
                >
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
                      <InputSubmit
                        type="submit"
                        value="Log in"
                      />
                </Form>
              </>
            </Layout>
        </div>
  )
}