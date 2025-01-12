import { create } from "zustand"
import { TwoPartJoke } from "../../types/types"

interface DragItem {
  id: number, 
  setup: string, 
  where: number  
}

interface DropArea {
  id: number, 
  delivery: string, 
  full: boolean, 
  who: number
}

interface DndStore {
  dragItems: DragItem[],
  dropAreas:  DropArea[],
  initDragItems: (jokes:TwoPartJoke[]) => void,
  updateDragItem: (itemId: number, areaId: number) => void,  
  initDropAreas: (jokes:TwoPartJoke[]) => void,
  updateDropArea: (targetAreaId: number, who:number) => void,
  removeFromDropArea: (targetItemId: number) => void
}

const useDndStore = create<DndStore>(set => ({
  dragItems: [],
  dropAreas:  [],
  initDragItems: (jokes) => set( 
    store => (      
      {...store, 
        dragItems: jokes.map(joke => ({ id: joke.id, setup: joke.setup, where: 0 }))
      }
    ) 
  ),
  updateDragItem: (itemId, areaId) => set( 
    store => (      
      {...store, 
        dragItems: store.dragItems.map(item => 
          item.id === itemId  
          ? { ...item, where: areaId }
          : item
        )
      }
    ) 
  ),   
  initDropAreas: (jokes) => set( 
    store => ({...store, 
      dropAreas: 
        [...jokes]
          .sort(() => Math.random() - 0.5)
          .map(joke => ({ id: joke.id, delivery: joke.delivery, full: false, who: 0 }))
    }) 
  ),  
  updateDropArea: (targetAreaId, who) => set( 
    store => ({...store, 
      dropAreas: store.dropAreas.map(area => 
        area.id === targetAreaId
        ? {...area, full: true, who: who}
        : area
    )}) 
  ),  
  removeFromDropArea: (targetItemId) => set( 
    store => ({...store, 
      dropAreas: store.dropAreas.map(area => 
        area.who === targetItemId
        ? {...area, full: false, who: 0}
        : area
    )}) 
  ),      
}))


export default useDndStore;