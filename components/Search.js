import styled from '@emotion/styled'
import SearchIcon from '../ui/SearchIcon'

import { useState } from 'react';
import Router from 'next/router';



const InputText = styled.input`
    max-width: 300px;
    margin: 0 auto;
    padding: .5rem;
    
    &:focus{
        outline: none;
    }
`;

const InputBtn = styled.button`
    display: flex;
    align-items: center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 1rem;
    top: 1px;
    border: none;
    background: #fff;

    &:hover{
        cursor: pointer;
    }
`;
const Form = styled.form`
    position:relative
`;

const Search = () => { 

    const [search, setSearch] = useState('');
    const searchProduct = e =>{
        e.preventDefault();
        if(search.trim() === '')   return;
        
        Router.push({
            pathname: '/searching',
            query: {
                q:search
            }
        })

    }

    return (
        <Form
            onSubmit={searchProduct}
        >
            <InputText type="text" placeholder="Hunt products" onChange={e=>setSearch(e.target.value)}/>
            <InputBtn>
                    <SearchIcon/>
            </InputBtn>
        </Form>
    )
}

export default Search
