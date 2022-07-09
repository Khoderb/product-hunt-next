import Link from "next/link"
import styled from "@emotion/styled"
import Navigation from "./Navigation"
import Search from "./Search"
import Button from "../ui/Button"
import { FirebaseContext } from '../firebase/context'
import { useContext } from "react"

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    font-family: 'PT Sans', sans-serif;

    @media (min-width: 768px) {
      display: flex;
      justify-content: space-between;
  }
`;
const HeaderLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`;
const Logo = styled.p`
    color: var(--orange);
    font-size: 4rem;
    font-weight: 700;
    font-family: 'Roboto Slab', sans-serif;
    margin: 0.5rem auto;
    padding-right: 5rem;
    &:hover {
      cursor:pointer;
    }
`;	 



const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);
  
  return (
    <header>
        <HeaderContainer>
            <HeaderLinks>
              <Link href="/">
                <Logo>P</Logo>
              </Link>
              <Search/>
              <Navigation/>
            </HeaderLinks>
            
            <HeaderLinks>
                {user ? 
                <>
                  <p>Hi BerniX</p>
                  <Button 
                    bgColor='true'
                    onClick={()=>firebase.logOut()}>
                    
                    Log out
                  </Button>
                 
                </>:
                <>
                  <Link href="/login">
                    <Button bgColor='true'>Log in</Button>
                  </Link>
                  <Link href="/createAccount">
                    <Button>Create Account</Button>
                  </Link>
                </>
                }
            </HeaderLinks>    

        </HeaderContainer>

    </header>
  )
}

export default Header
