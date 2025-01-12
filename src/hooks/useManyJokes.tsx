import { useEffect, useState } from 'react'
import APIclient from '../services/apiClient';
import { AxiosError, CanceledError } from 'axios';
import { FetchResponseError, JokeCategory, JokeType } from '../types/types';
import useAppStore from '../stores/app.store';

interface useManyJokesProps {
  amount?: number,
  jokeCategory?: JokeCategory,
  type?: JokeType
}

const useManyJokes = <K,>({ amount = 10, jokeCategory = "Any", type = "twopart" } : useManyJokesProps) => {

  const roundsPlayed = useAppStore(s => s.roundsPlayed);   

  const apiClient = new APIclient<K>(jokeCategory)
  
  const [jokes, setJokes] = useState<K[] | null>(null);
  const [error, setError] = useState<AxiosError<FetchResponseError> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    setIsLoading(true);

    const controller = new AbortController();

    apiClient.getJokes({signal: controller.signal, params: {
      blacklistFlags: "nsfw,religious,sexist,explicit",
      type,
      amount
    }})
      .then(res => {
        setJokes(res.jokes);
        setIsLoading(false);
        setError(null);
      })
      .catch((err:AxiosError<FetchResponseError>) => {        
        if (err instanceof CanceledError) {
          console.log("Fetch canceled on effect cleanup")
          return
        }
        setError(err);
        setIsLoading(false);
      })

    return () => {
      controller.abort();
    }

  },[roundsPlayed])

  return { jokes, error, isLoading }
}

export default useManyJokes