import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import Logo from '../Logo';

const HeaderContainer = styled.header`
    width: 100%;
    background-color: ${({ theme }) => theme.color.blueGray };
    padding: 25px 40px;
    box-sizing: border-box;
    
    nav {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
    }
`;

const SearchForm = styled.div`
    width: 400px;
    position: relative;
    input {
        width: 100%;
        background-color: transparent;
        border-radius: 25px;
        border: 2px solid #fff;
        padding: 5px 15px;
        box-sizing: border-box;
        outline: none;
        font-size: 1rem;
        color: #fff;
        font-family: ${({ theme }) => theme.font.family }
    }
    button{
        position: absolute;
        right: 12px;
        top: 8px;
        background-color: transparent;
        border: none;
        cursor: pointer;

        .icon{
            color: #fff;
        }
    }
`;

const Header = ({ setShows }) => {
    const [ value, setValue ] = useState("");

    const handleSearchClick = async () => {
        try {
            const result = await axios.request({
                method:'GET',
                url: `https://api.tvmaze.com/search/shows?q=${value}`,
            });

            console.log(result.data.map(show => { return show.show}))
            setShows(result.data.map(show => { return show.show}));
        } catch (error) {
            alert(error);
        }
    }

    return ( 
        <HeaderContainer>
            <nav>
                <Logo />
                <SearchForm>
                    <form onSubmit={e => e.preventDefault()}>
                        <input onChange={e => setValue(e.target.value)} type='text' value={value}></input>
                        <button onClick={handleSearchClick}><AiOutlineSearch className='icon' size='1.6em'/></button>
                    </form>
                </SearchForm>
            </nav>
        </HeaderContainer>
     );
}
 
export default Header;