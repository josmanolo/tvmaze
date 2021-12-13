import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StarRating from '../StarRating';

const Card = styled.div`
    width: 90%;
    margin: 0 auto;

    a{
        width: 100%;
        height: auto;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        color: #fff;
        text-decoration: none;
    }

    img{
        border-radius: 15px;
        box-shadow: ${({ theme }) => theme.bpxShadow };
        margin-bottom: 15px;

    }

    h3{
        width: 100%;
        font-weight: 600;
        font-size: 1.03rem;
        letter-spacing: .4px;
    }

    p{
        word-break: break-word;
        margin-bottom: 3px;
        line-height: 1.2;
        opacity: .8;
    }
`;

const ShowCard = ({ id, name, runtime, schedule, image, rating, language }) => {
    const [ stars, setStars ] = useState();
    const [ starsRight, setStarsRight ] = useState();

    useEffect(() => {
        const starsNum = parseInt((rating / 2).toFixed()) ;
        const starsArr = [...Array(starsNum).keys()]
        const starsRightArr = [...Array( 5 - starsArr.length ).keys()]
        
        setStarsRight(starsRightArr)
        setStars(starsArr);
    }, [rating]);

    const formatRuntime = (num) => {
        if(num == null) return <p></p>

        let hrs = Math.floor(num / 60);          
        let mins = num % 60;

        return num > 60 ? `${hrs} hours ${mins} minutes` : `${num} minutes`;
    }

    const formatDate = (lng, days, time) => {
        let hours = time.substring(0,2);
        let format = hours >= 12 ? 'pm' : 'am';
        let minutes = time.substring(3,5);

        let notEngSchedule = `${days.toString()} - ${(hours % 12) || 12}:${minutes} ${format}`;
        let engSchedule = `${days.toString()} - ${time}`;

        if(days === "" || time === "") return "";
        return lng === "English" ? engSchedule : notEngSchedule;
    }

    return ( 
        <Card>
            <Link 
                to={`/show/${id}`}
                state={{
                    starsFilled: stars ? stars : 0,
                    starsUnfilled: starsRight,
                    runtime: formatRuntime(runtime),
                    date: formatDate(language, schedule.days, schedule.time) 
                }}
            >
                <img src={image} alt='wit' />
                <h3>{name}</h3>
                <StarRating
                    id={id}
                    stars={stars} 
                    starsRight={starsRight}
                />
                <p>{ formatDate(language, schedule.days, schedule.time ) }</p>
                <p>{ formatRuntime(runtime) }</p>
            </Link>
        </Card>
     );
}
 
export default ShowCard;