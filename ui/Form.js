import styled from '@emotion/styled'


export const Form = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 1rem auto 5rem auto;
    font-family: 'PT Sans', sans-serif;
    padding: .2rem 1.5rem .4rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.2);
    `;



export const Field = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;

    label {
        flex: 0 0 100px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #333;
        padding: 0.5rem;
    }
    
    input, textarea {
        flex: 1;
        border: none;
        outline: none;
        padding: 0.8rem;
        font-size: 1.5rem;
        border: 1px solid #aaa;
        &:placeholder{
            color: #333;
        }
    }
    
    textarea {
        height: 100px;
        resize: none;
    }


   
`;

export const InputSubmit = styled.input`
background-color: var(--orange2);
font-weight: bold;
width: 100%;
padding: 1rem 0;
margin-bottom: 1rem ;
border: none;
text-transform: uppercase;
font-family: 'PT Sans', sans-serif;
&:hover{
        background-color: var(--orange);
        color:#fff;
        cursor: pointer;
        transition:all .3s;
    }
`;


export const Errors = styled.p`
    background-color :rgba(250,0,0,.6);
    color: #fff;
    font-family : "PT Sans", sans-serif;
    font-weight: bold; 
    width: 100%;
    padding: 1 0 ;
    text-transform: uppercase;
    margin: 0 auto 2rem;
    text-align: center;
    line-height: 35px ;
    animation: op 0.5s ease-in-out;
    @keyframes op{
        from{
            transform:translateY(-100);
            opacity: 0;
        }
        to{
            transform:translateY(0);
            opacity: 1;
        }
    }
    `

    