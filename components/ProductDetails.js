import styled from "@emotion/styled"
import { formatDistanceToNow } from 'date-fns'
import Link from "next/link"
import Image from "next/image"

const Li = styled.li`
    padding: 3rem 2rem 1rem;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.2);
    align-items: center;
    font-family: 'PT Sans', sans-serif;

    &: hover{
        background-color: #e1e1e1;

    }

`
const Description = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;

    `
const Title = styled.a`
    font-weight: bold;
    margin:0;
    font-size:2.2rem;
    text-decoration: none;
    color: var(--orange2);
    
    &:hover{
        color: var(--orange);

        cursor: pointer;
    }
    `
const Coments = styled.div`
   margin-top: 2rem;
   display: flex;
   algin-items: center;
   font-weight: bold;
   font-family: "Roboto Slab", sans-serif;
    div{
        display: flex;
        align-items: center;
        padding: 0.3rem .6rem;
        margin-right: 2rem;
    }
    svg{
        width: 30px;
        height: 30px;
        margin-right: 2rem;

    }
    p{
        font-size: 1.6rem;
        font-weight: 700;
        margin-right: 2rem;
        &:last-of-type{
            margin-right: 0;
        }
    }
`

const Votes = styled.div`
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 0.3 2rem;
    margin: 15rem 5rem 0 0;
    gap: .5rem;
    div{
        display:flex;
        font-size: 2rem;
    }
    p{
        font-size: 2rem;
        margin:0;
        font-weight: 700;
        padding-bottom: .5rem;
    }
    `
const Pdescription = styled.p`
    font-size:1.7rem,
    font-weight: semi-bold;
    margin: 3rem 1rem 0;
`

const ProductDetails = ({product}) => {
    const {name, id, enterprise, coments, createdAt, urlImg, votes, url, description} = product;
    return (
            <Li>
                <Description>
                    <div>
                        <Image src={urlImg} width={400} height={600} alt="product" />
                    </div>
                    <div>
                        <Link href="/products/[id]" as={`/products/${id}`}>
                            <Title href={urlImg}>{name}</Title>
                        </Link>
                        <Pdescription>{description}</Pdescription>
                    <Coments>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p>{coments.length} comentarios</p>
                        </div>
                    </Coments>

                    {createdAt && <p>Published at {formatDistanceToNow(new Date(createdAt))}</p>}

                    </div>
                </Description>
                <Votes>
                    <div>&#9650;</div>
                    <p>{votes} Votes</p>
                </Votes>
            </Li>
    )
}

export default ProductDetails
