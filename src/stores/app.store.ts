import { create } from "zustand"

interface DndStore {
  roundsPlayed: number,
  winner: boolean
  increaseRoundsPlayed: () => void,
  setWinner: (status: boolean) => void
}

const useAppStore = create<DndStore>(set => ({
  roundsPlayed: 0,
  winner: false,
  increaseRoundsPlayed: () => set( 
    store => ({ roundsPlayed: store.roundsPlayed + 1 }) 
  ),
  setWinner: (status) => set( 
    () => ({ winner: status }) 
  ) 
}))

export default useAppStore;