import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';
import Header from '../Header';
import ShowCard from '../ShowCard';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const ShowsContainer = styled.main`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    place-content: center;
    gap: 2.5rem 1rem;
    padding: 30px 0;
`;

const Pagination = styled.div`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;

    .container{
        width: auto;
        display: flex;
        list-style: none;
        color: #fff;
        margin: 0 auto;
    }

    .page{
        border: 1px solid #dcdcdc;
        border-radius: 6px;
        margin-right: 10px;
        cursor: pointer;
        a {
            display: block;
            width: 40px;
            height: 30px;
            text-align: center;
            line-height: 2.2;
        }
    }

    .disabled{
        cursor: not-allowed;
    }

    .active{
        border: 2px solid;
        border-color: ${({ theme }) => theme.color.primaryBlue };
        background-color: ${({ theme }) => theme.color.primaryBlue };
        font-weight: 700;
    }

    .previous, .next{
        padding: 10px;
        border-radius: 6px;
        margin-right: 10px;
        cursor: pointer;
        
        .page {
            border: none;
        }
    }

    .break{
        padding: 10px;
    }

`;


const Shows = () => {
    const [ shows, setShows ] = useState();

    const { res, isLoading, error } = useApi({
        method: 'GET',
        url: '/shows',
    });

    useEffect(() => {
        setShows(res)
    }, [res])

    const apiPageRequest = async (current) => {
        try {
            const result = await axios.request({
                method:'GET',
                url: `https://api.tvmaze.com/shows?page=${current}`,
            });

            setShows(result.data);
        } catch (error) {
            alert(error);
        }
    }

    const handlePage = (selectedObject) => {
        apiPageRequest(selectedObject.selected);
	};
    
    return ( 
        <>
        <Header setShows={setShows}/>
        <ShowsContainer>
            { !isLoading ?
                shows.map( show => (
                    <ShowCard 
                        id={show.id}
                        name={show.name}
                        runtime={show.runtime}
                        schedule={show.schedule}
                        image={show.image ? show.image.medium : 'https://media.comicbook.com/files/img/default-movie.png'}
                        rating={show.rating.average}
                        key={show.id}
                        language={show.language}
                    />
                )) 
                : <p>LOADING...</p>
            }
            
        </ShowsContainer>
        { !isLoading ?
                <Pagination>
                    <ReactPaginate
                        pageCount={150}
                        pageRange={6}
                        marginPagesDisplayed={2}
                        onPageChange={handlePage}
                        containerClassName={'container'}
                        previousLinkClassName={'page'}
                        breakClassName={'page'}
                        nextLinkClassName={'page'}
                        pageClassName={'page'}
                        disabledClassName={'disabled'}
                        activeClassName={'active'}
                    />
                </Pagination>
                : ""
            }
        
        </>
     );
}
 
export default Shows;