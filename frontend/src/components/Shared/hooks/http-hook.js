import { useState, useCallback} from 'react';
const axios = require('axios');
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}, defaultErrorMsg="") => {
      setIsLoading(true);

      try {
        const response = await axios({method:method, url:url, headers:headers, data:body});
        setIsLoading(false);
        return response;
      } catch (err) {
        if(err.response) {
          setError(err.response.data.message); 
        }
        else {
          setError(defaultErrorMsg);
        }
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };


  return { isLoading, error, sendRequest, clearError };
};


/**
import { useState, useCallback} from 'react';
const axios = require('axios');
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}, defaultErrorMsg="") => {
      setIsLoading(true);

      try {
        const response = await axios({method:method, url:url, headers:headers, data:body});
        setIsLoading(false);
        return response;
      } catch (err) {
        if(err.response) {
          setError(prevError => prevError = err.response.data.message,
            t => {
              setIsLoading(false);
              throw err;
            }
          ); 
        }
        else {
          setError(prevError => prevError = defaultErrorMsg,
            t => {
              setIsLoading(false);
              throw err;
            }
          ); 
        }
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };


  return { isLoading, error, sendRequest, clearError };
};
 
*/