import {useContext, useEffect, useState} from 'react';
import { authContext } from '../context/AuthContext';
//import { token } from '../config';

const useFetchData = (url) => {

    const { token } = useContext(authContext);
   
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Parse the token to remove extra escape characters and double quotes
    //const parsedToken = token.replace(/\\"/g, '').replace(/\\/g, '').replace(/"/g, '');
    //console.log('Token in useContext useFetchData: ', token);

    useEffect(() => {
        const fetchData = async () => {
  
            setLoading(true);
            try {

                const res = await fetch(url, {
                    headers: {Authorization : `Bearer ${token}`}
                })
    
                const result = await res.json();
    
                if(!res.ok){
                    throw new Error(result.message + 'haha')
                }

                // console.log("Data: ", result.data);
                setData(result.data)
                setLoading(false);

            } catch (err) {
                setLoading(false);
                setError(err.message)
            }
        };

        fetchData();
    }, [url])

    return {
        data, loading, error
    }
}

export default useFetchData;