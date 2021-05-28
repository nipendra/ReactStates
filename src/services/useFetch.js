import {useState, useEffect} from 'react';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function useFetch(url) {
    const [data, setdata] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function init () {
      // getProducts("shoes")
      // .then((response) => setproducts(response))
      // .catch((e) => setError(e))
      // .finally(()=> setLoading(false));
      try {
        const response = await fetch(baseUrl + url);
        if(response.ok){
            const json = await response.json();
            setdata(json);
        } else {
            throw response;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  },[url]); 

  return {data, error, loading};
};