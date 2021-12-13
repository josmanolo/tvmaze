import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';
import Header from '../Header';
import Logo from '../Logo';
import StarRating from '../StarRating';
import { RiCloseCircleLine } from "react-icons/ri";



const Detail = styled.div`
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
    color: #fff;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 0 auto;

    h4{
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 20px;
        text-align: center;
    }

    p{
        margin-bottom: 8px;
        font-weight: 300;
        font-size: 1.03rem;
        line-height: 1.3;
        text-align: center;
    }

    a{
        color: ${({ theme }) => theme.color.primaryBlue };
    }

    img{
        cursor: pointer;
    }

`;

const LogoContainer = styled.div`
    width: 140px;
    margin: 0 auto;
    padding: 30px 0;
`;

const ImageLightbox = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 100;
    background-color: #000000b5;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;

    img{
        height: 90%;
    }

    .close {
        color: #fff;
        top: 20px;
        position: fixed;
        right: 20px;
        cursor: pointer;
    }
`;

const ShowDetail = () => {
    const [ showImage, setShowImage ] = useState(false)
    const location = useLocation()

    let { id } = useParams();

    const { res, isLoading, error } = useApi({
        method: 'GET',
        url: `/shows/${id}`,
    });

    const handleImgClick = () => {
        setShowImage(!showImage);
    }

    

    return (
        <>
            <LogoContainer>
                <Logo />
            </LogoContainer>
            <Detail>
                {
                    !isLoading ?
                        <>
                            <h4>{res.name}</h4>
                            <img src={res.image.medium} alt={res.name} onClick={handleImgClick}/>
                            <StarRating 
                                id={res.id}
                                stars={location?.state?.starsFilled} 
                                starsRight={location?.state?.starsUnfilled}
                            />
                            <p>{res.genres.join(", ")}</p>
                            <p>{location?.state?.runtime}</p>
                            <p>{location?.state?.date}</p>
                            <p>{res.status}</p>
                            <p><a href={res.url}>More info</a></p>
                            <p>{res.summary.replace(/<(.|\n)*?>/g, '')}</p>
                        </>
                    : <p>Loading...</p>
                }
            </Detail>
            { showImage && 
                <ImageLightbox>
                    <img src={res.image.original}></img>
                    <RiCloseCircleLine onClick={handleImgClick} className="close" size="3.5rem"></RiCloseCircleLine>
                </ImageLightbox>
            }

        </>  
    );
}
 
export default ShowDetail;