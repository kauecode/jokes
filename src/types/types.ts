export type JokeCategory = "Any" | "Misc" | "Programming" | "Dark" | "Pun" | "Spooky" | "Christmas";
export type JokeType = "single" | "twopart";

interface BaseJoke {
  category: JokeCategory,
  type: JokeType,
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

export interface TwoPartJoke extends BaseJoke {
  type: "twopart";
  setup: string; 
  delivery: string;   
}

export interface SingleJoke extends BaseJoke {
  type: "single";
  joke: string
}

export interface FetchResMany<T> {
  error: boolean,
  amount: number,  
  jokes: T[];
}

export type FetchResSingle<T> = { 
  error: boolean 
} & (T);

export interface FetchResponseError {
    error: boolean,
    internalError: boolean,
    code: number,
    message: string,
    additionalInfo: string,
    timestamp: number
}

