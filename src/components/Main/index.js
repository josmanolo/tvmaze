import React from 'react';
import Shows from '../Shows';
import { Routes, Route } from "react-router-dom";
import ShowDetail from '../ShowDetail';

const Main = () => {
    return ( 
        <>
            <Routes>
                <Route path="/" element={<Shows />} />
                <Route path="/show/:id" element={<ShowDetail />} />
            </Routes>
        </>
     );
}
 
export default Main;