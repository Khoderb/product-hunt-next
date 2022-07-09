import styled from "@emotion/styled"

const Button = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    background-color: ${prop => prop.bgColor ? '#DA552F':'#FFF'};
    border: 1px solid #d1d1d1;
    color:#000;
    padding : .3rem 2rem;
    margin: 2rem auto;
    text-align: center;
    font-family: 'PT Sans', sans-serif;

        
        &:last-of-type {
            margin-right: none;
        }
        &:hover {
            cursor:pointer;
            background-color: #e85027d3;
            color:#fff;
            transition: all 0.3s;
        }
    `;

export default Button;