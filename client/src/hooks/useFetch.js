import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url, body, requestType) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        async function makeRequest () {
            try {
                const content = await axios[requestType](url, {
                    headers: {
                        authorization: 'HelloWorld'
                    },
                    ...body
                })

                if (content.message) {
                    throw Error(content);
                }

                setData(content);
                setIsLoading(false);

            } catch (error) {
                setError(error);
            }
        }

        makeRequest();
    }, [url, body])


    return [data, isLoading, error];
}

export default useFetch;