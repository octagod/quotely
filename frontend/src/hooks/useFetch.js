import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, {
            signal: abortCont.signal
        })
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                setData(res.data);
                setError(null);
                setIsLoading(false)
            }else {
                setError(res.msg);
                setData(null);
                setIsLoading(false)
            }
        }).catch(err => {
            if(err === 'AbortError') {
                console.log('Fetch terminated');
            }else {
                console.log(err);
                setData(null);
                setIsLoading(false);
                setError('GASERR_: error with fetch');
            }
        })

        return () => abortCont.abort();
    }, [url])
    return {data, error, isLoading};
}
 
export default useFetch;