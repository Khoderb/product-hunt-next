import { useRouter} from 'next/router'
import { useEffect, useState } from 'react';

import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import Error404 from '../../components/404'
import Layout from '../../layout/Layout'

import styled from '@emotion/styled';
import { formatDistanceToNow} from 'date-fns'

import{ Field, InputSubmit} from '../../ui/Form'

import {FirebaseContext} from '../../firebase/context';
import { useContext } from 'react'
import Button from '../../ui/Button'
import Image from 'next/image';

const H1 = styled.h1`
    font-size: 2.9rem;
    font-weight: bold;
    text-align: center;
    margin:0;
`
const ProductContainer = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`

const Aside = styled.div`
    padding: 3.5rem 5rem;
    text-align: center;
    margin-left: 4rem;
`
const Div = styled.div`
    margin-top:8rem;
    padding: 0.5rem;
    
    button{
        margin: 0 auto;
        display: block;
        width: 100%;
        border:none;
        width : 150px;   
        cursor:pointer;
        background-color: #DA552F;
        color:#000;
        font-weight: bold;
        font-family: 'PT Sans', sans-serif;
        text-transform: uppercase;
        font-size: 1.1rem;
        padding: 0.5rem ;
        letter-spacing: 2px;
        
        &:hover {
            background-color: #e85027d3;
            color:#fff;
            transition: all 0.3s;
        }
        
        p{     
            font-family: 'PT Sans', sans-serif;
        }
    }
`

const Li = styled.li`

    list-style: none;
    font-family: 'PT Sans', sans-serif;
    padding: 1em 0 0 0;
    margin: 1em 1em 0;
    border-top: 1px solid #ccc;

    p{
        padding-left: 1em;
        margin-top:.15em;
    }
    .msg{
        margin-left: 1rem;
    }
    span{
        font-weight: bold;
        border-bottom: 1px solid #ccc;
    }
    `
    const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    padding: 0.8rem;
    font-size: 1.5rem;
    border: 1px solid #aaa;
    font-family: 'PT Sans', sans-serif;

    `

    const ProductCreator = styled.p`
        padding: .2rem 1.6rem;
        background-color: #DA552F;
        color: #fff;
        font-weight: bold;
        display: inline-block;
        text-align: 
        `

const Product = () => {

    const [product, setProduct ] = useState({})
    const [error, setError] = useState(false)
    const [coment, setComent] = useState({})
    const [queryDB, setQueryDB] = useState(true)
    const router = useRouter();
    const { query:{id} } = router;
    
    const { user, firebase } = useContext(FirebaseContext);


    useEffect(() => {
        if(id && queryDB){
        const fireFetch = async () => { 
            try {  
                const docRef = doc(firebase.db, "products", id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setProduct({...docSnap.data(), id: docSnap.id});
                    setQueryDB(false)
                } else {
                    setError(true);
                    setQueryDB(false)

                }
            } catch (error) {
                    console.log("Error getting document:", error);
                }
            }
            fireFetch();
        }
    }, [id,firebase.db, queryDB])

    const {name, creator, enterprise, coments, createdAt, urlImg, votes, url, description, hasVoted} = product;
    

    const addVote = async () => {
        if(!user){
            return router.push('/login')
        }
        if(hasVoted.includes(user.uid)){
            return      
        }
        const docRef = doc(firebase.db, "products", id);
        const docSnap = await getDoc(docRef);
        const newVotes = docSnap.data().votes + 1;
        await updateDoc(docRef, {votes: newVotes, hasVoted: [...hasVoted, user.uid]});


        setProduct({...product, votes: newVotes});
        setQueryDB(false)
    }

    //Comments
    const comentChange = e =>{
        setComent({
            ...coment, 
            [e.target.name]: e.target.value
        })
    }

    const addComent = async e =>{
        e.preventDefault();
        if(!user){
            return router.push('/login')
        }
        coment.userid = user.uid;
        coment.userName = user.displayName;
        const newComents = [...coments, coment];

        const docRef = doc(firebase.db, "products", id);
        await getDoc(docRef);
        await updateDoc(docRef, {coments: newComents});
        
        setProduct({...product, coments: newComents});
        setQueryDB(false)

    }
    //Creator
    const isCreator = id =>{
        if(creator.id===id){
            return true;
        }
    }
    
    //is the creator the same who is authenticatd?

    const checkAuth = ( )=>{
        if(!user) return false
            if(creator.id===user.uid){
                return true;
            }
    } 
    const deleteProduct = async() =>{
        
        try {
            if(!user || creator.id!==user.uid) return router.push('/login')
                const docRef = doc(firebase.db, "products", id);
                await getDoc(docRef);
                await deleteDoc(docRef);
                router.push('/')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            {error ? <Error404 /> : 
                <>
                    <div className="container">
                            {!product.name && <p style={{textAlign: 'center'}}>Loading...</p>}
                            <H1>{name}</H1>
                        <ProductContainer>
                            <div>
                                {createdAt && <p>Published at {formatDistanceToNow(new Date(createdAt))}</p>}    
                                {creator && <p>By {creator.name} from {enterprise} </p>}
                                {urlImg && <Image src={urlImg} width={400} height={600} alt={`Product ${product.name}`}/>}
                                <p>{description}</p>
                                {user&&
                                    <>
                                        <h2>Leave your coments</h2>        
                                        <form onSubmit={addComent}>
                                            <Field>
                                                <Input type="text" name="message" onChange={comentChange} />
                                            </Field>
                                            <InputSubmit
                                                type="submit"
                                                value="Add Coments"
                                                />
                                        </form>
                                    </>
                                }
                                <h2>All coments</h2>   
                                {coments && coments.length===0 ? "There are no coments" :(

                                    <ul>
                                    {coment.userName && coments.map((coment,i)=>(
                                        <Li
                                            key={`${coment.userid}-${i}`}
                                        >
                                            <p>Writed by <span>{coment.userName}</span></p>
                                            <p className="msg">{coment.message}</p>
                                            {isCreator(coment.userid) && <ProductCreator>Creator</ProductCreator>}
                                        </Li>
                                        ))
                                    }
                                    </ul>
                                )}     

                            </div>
                            <Aside>
                                <Button
                                    target="_blank"
                                    href={url}
                                    bgColor={true}
                                >Visit URL</Button>


                                <Div>
                                    <p>{votes} Votes</p>
                                    {user &&
                                        <button
                                        onClick={addVote}
                                        >
                                            Vote
                                        </button>
                                    }
                                </Div>

                            </Aside>
                        </ProductContainer>
                        {creator && checkAuth() && <Button
                            style={{width:'300px',margin:'0 auto'}}
                            bgColor={true}
                            onClick={deleteProduct}
                        >Delete Product</Button>}
                    </div>
                </>
            }
        </Layout>
    )
}

export default Product
