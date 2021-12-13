import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.tvmaze.com';

export const useApi = (axiosParams) => {
    const [res, setRes] = useState(undefined);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (params) => {
        try {
            const result = await axios.request(params);
            setRes(result.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(axiosParams);
    }, []);

    return {
        res,
        error,
        isLoading
    };
};