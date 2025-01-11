import { useEffect, useState } from 'react'
import APIclient from '../services/apiClient';
import { AxiosError, CanceledError } from 'axios';
import { FetchResponseError, JokeCategory, JokeType } from '../types/types';

interface useSingleJokesProps {
  jokeCategory?: JokeCategory,
  type?: JokeType
}

const useSingleJoke = <K,>({ jokeCategory = "Any", type = "twopart" } : useSingleJokesProps) => {

  const apiClient = new APIclient<K>(jokeCategory)
  
  const [joke, setJokes] = useState<K | null>(null);
  const [error, setError] = useState<AxiosError<FetchResponseError> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    setIsLoading(true);

    const controller = new AbortController();

    apiClient.getOneJoke({signal: controller.signal, params: {
      blacklistFlags: "nsfw,religious,sexist,explicit",
      type
    }})
      .then(res => {
        setJokes(res);
        setIsLoading(false);
        setError(null);
      })
      .catch((err:AxiosError<FetchResponseError>) => {        
        if (err instanceof CanceledError) {
          console.log("Fetch Canceled")
          return
        }
        setError(err);
        setIsLoading(false);
      })

    return () => {
      controller.abort();
    }

  },[])

  return { joke, error, isLoading }
}

export default useSingleJoke