import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Stars = styled.div`
    width: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;

    span{
        color: gray;
        &.active{
            color: ${({ theme }) => theme.color.yellow }
        }
    }
`;

const StarRating = ({ stars, starsRight }) => {
    const [ starsRating, setStarsRating] = useState();

    useEffect(() => {
        if(stars){
            const starsArr = stars.map(star => (<span className="active">&#9733;</span>));
            const starsRightArr = starsRight.map(star => (<span>&#9733;</span>));

            setStarsRating(starsArr.concat(starsRightArr));
        }
    }, [stars]);

    return ( 
        <Stars>{ starsRating }</Stars>
     );
}
 
export default StarRating;