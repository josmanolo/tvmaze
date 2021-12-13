import React from 'react';
import styled from 'styled-components';
import { RiMovie2Line } from "react-icons/ri";

const LogoContainer = styled.div`
    width: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p{
        color: #fff;
        font-size: 2em;
        font-weight: 700;
        span{
            color: ${({ theme }) => theme.color.primaryBlue };
            font-weight: 600;
        }
    }

    .icon{
        color: ${({ theme }) => theme.color.primaryBlue };
    }
`;

const Logo = () => {
    return ( 
        <LogoContainer>
            <RiMovie2Line className='icon' size='1.6em'/>
            <p>TV<span>maze</span></p>
        </LogoContainer>
     );
}
 
export default Logo;