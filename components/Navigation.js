import styled from "@emotion/styled"
import Link from "next/link"
import { FirebaseContext } from '../firebase/context'
import { useContext } from "react"




const Navigation = () => {
  const { user } = useContext(FirebaseContext);

  const Nav = styled.nav`
    padding-left: 2rem;
    @media (max-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
    }
    a {
      padding-left: 2.5rem;
      color:var(--gray2);
      text-decoration: none;
      font-size: 1.8rem;
      &:hover {
        color: var(--orange);
      }
    }    
  `

  return (
          <Nav>
            <Link href={'/'}>Home</Link>
            <Link href={'/popular'}>Populares</Link>
            {user &&
            <Link href={'/newProduct'}>New Product</Link>
            }
          </Nav>
  )
}

export default Navigation
