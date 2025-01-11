// WHY THIS IS HERE ?
//
// I'm keeping the code for reference, thought 
// about merging both useXJokes hooks into one and follow
// the DRY principle, but decided to have separation
// of concerns here instead, the response from the API 
// is indeed different when fetching 1 or many items.
//
// Also ended up in a TS inference hole, 
// will revisit this at a later date.

import { useEffect, useState } from 'react'
import APIclient from '../services/apiClient';
import { AxiosError, CanceledError } from 'axios';
import { FetchResponseError, JokeCategory, JokeType } from '../types/types';

interface useManyJokesProps {
  amount?: number,
  jokeCategory?: JokeCategory,
  type?: JokeType
}

const doNotUseJokes = <K,>({ amount = 10, jokeCategory = "Any", type = "twopart" } : useManyJokesProps) => {

  const apiClient = new APIclient<K>(jokeCategory)
  
  const [jokes, setJokes] = useState<K[] | K | null>(null);
  const [error, setError] = useState<AxiosError<FetchResponseError> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    setIsLoading(true);

    const controller = new AbortController();

    const isSingleFetch = amount > 1 ? false : true;

    const params = {
      blacklistFlags: "nsfw,religious,sexist,explicit",
      type,
      amount
    }

    const fetchJokes = isSingleFetch 
      ? apiClient.getJokes({signal: controller.signal, params})
      : apiClient.getOneJoke({signal: controller.signal, params})

    fetchJokes
      .then(res => {
        if (isSingleFetch) {
          setJokes(res as K)
        } else {
          if ("jokes" in res) {
            setJokes(res.jokes as K[]);
          } else {
            throw new Error("There was an issue with the data.")
          }
        }
        setIsLoading(false);
        setError(null);
      })
      .catch((err:AxiosError<FetchResponseError>) => {        
        if (err instanceof CanceledError) {
          console.log("Fetch Canceled")
          return
        }
        console.log(err);
        setError(err);
        setIsLoading(false);
      })

    return () => {
      controller.abort();
    }

  },[])

  return { jokes, error, isLoading }
}

export { doNotUseJokes }
// Not exporting this hook, do not use.