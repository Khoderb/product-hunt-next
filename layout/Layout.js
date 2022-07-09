import Header from "../components/Header"
import { Global, css } from "@emotion/react"
import Head from "next/head"
const Layout = ({children}) => {

  return (
    <>  
        <Global
            styles = {css`
                :root{
                    --gray: #3d3d3d;
                    --gray2: #6f6f6f;
                    --gray3: #e1e1e1;
                    --orange: #DA552F;
                    --orange2: #da542fbe;
                }
                html{
                    font-size: 62.5%;
                    box-sizing: border-box;
                }
                *,*:before,*:after{
                    box-sizing: inherit;
                }
                body{
                    font-size: 1.6rem;
                    line-height: 1.5;
                }
                h1,h2,h3{
                    margin: 0 0 2rem 0;
                    line-height: 1.5;
                }
                h1, h2 {
                    font-family:'Roboto Slab',sans-serif;
                    font-weight: 700;
                }
                h3{
                    font-family:'PT Sans',sans-serif;
                }
                h4{
                    font-family:'PT Sans',sans-serif;
                    margin-left:1rem; 
                    font-weight:500; 
                    font-size:2rem;
                }
                
                ul{
                    list-style: none;
                    margin:0;
                    padding:0;
                }
                a{
                    text-decoration:none;
                }
                header{
                    border-bottom: 2px solid var(--gray3);
                    padding: 1rem 0;
                }
                img{
                    max-width: 100%;
                    max-height: 65%;
                }

            `}
        />
        <Head>
            <title>Product Hunt Firebase & Next.js</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <link rel="stylesheet" href="/styles/globals.css"/>
        </Head>
        <Header/>
       
        <main>
            {children}
        </main>
    </>
  )
}

export default Layout