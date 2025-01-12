import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';
import { TwoPartJoke } from '../../types/types';
import WinnerScreen from '../WinnerScreen';
import useDndStore from './dndstage.store';
import useAppStore from '../../stores/app.store';

interface DragDropStageProps {
  jokes: TwoPartJoke[]
}

const DragDropStage = ({jokes} : DragDropStageProps) => {

  const setWinner = useAppStore(s => s.setWinner);    
  const roundsPlayed = useAppStore(s => s.roundsPlayed);    

  // Using Zustand store as a 
  // reducer to simplify component
  // logic, not share with other
  // parts of the app
  const {
    dragItems, 
    dropAreas, 
    initDragItems,
    updateDragItem,
    initDropAreas,
    updateDropArea,
    removeFromDropArea
  } = useDndStore();  

  useEffect(() => {
    // Set 2 lists, one for "Draggable Items" 
    // with the joke setup, another with 
    // the "Droppable Areas" with the joke delivery
    initDragItems(jokes)
    initDropAreas(jokes)
    console.log("Ran")
  }, [roundsPlayed])

  useEffect(() => {
    // Both lists have the joke ids, 
    // if we have one list with all 
    // ids matching, we have a winner
    setWinner(dragItems.every(item => item.id === item.where));    
  }, [dragItems]);

  const handleDragEnd = ( { active, over } : DragEndEvent) => {   
    const activeId = Number(active.id);
    // if drag ends "over" a drop area
    if (over) {
      const overIdFormatedToNumber = Number(over.id);
      const targetDragArea = dropAreas.find(item => item.id === overIdFormatedToNumber);
      if (!targetDragArea?.full) {
        // Remove from previous drop area 
        // in case it is moving between areas
        removeFromDropArea(activeId); 
        updateDropArea(overIdFormatedToNumber, activeId);
        updateDragItem(activeId, overIdFormatedToNumber);
      } 
    } else {
      removeFromDropArea(activeId);
      updateDragItem(activeId, 0);
    }
  }    

  // All errors should have been handled 
  // before we get here, but just in case
  if (dragItems.length < 1) return null

  return (
    <>
      <WinnerScreen/>
      <DndContext onDragEnd={handleDragEnd}>
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: "1fr", md: "3fr 1fr 3fr" }} 
          gap={2}
        >
          <Box sx={{ p: 2 }}>
            {dragItems
              .map(item => (
                <Box key={item.id} sx={{
                  p: 1, 
                  bgcolor: "#CCC",
                  m: 1,
                  minHeight: '90px',
                  display: "flex",
                  borderRadius: 2
                }}
                > {item.where === 0 &&
                  <Draggable id={item.id} where={0}>
                    {item.setup} / {item.id}
                  </Draggable>}
                </Box>
              ))} 
          </Box>
          <Box display="flex">
            <Box
              sx={{
                transformOrigin: "center center",
                transition: "all 0.5s ease-in",
                opacity: 0.1,                
                width: '100%',
                alignSelf: "center",
                justifySelf: "center",
                p: 3,
                borderRadius: 2,
                overflow: 'hidden'
              }}>
              <img
                src="/logo.svg"
                alt="Example Image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            {dropAreas.map((area, i) => (
              <Droppable key={i} id={area.id} who={area.who}>
                {dragItems.some(item => item.where === area.id)
                  ? dragItems
                      .filter(item => item.where === area.id)
                      .map(item => (
                        <Draggable key={item.id} id={item.id} where={item.where}>
                          <Typography>{item.setup} / {item.id}</Typography>
                          <Typography sx={{fontWeight: "600"}}>{area.delivery} / {area.id}</Typography>
                        </Draggable>
                      ))
                  : <Typography sx={{textAlign: 'center'}}>{area.delivery} / {area.id}</Typography>}
              </Droppable>
            ))}
          </Box>
        </Box>
      </DndContext>        
    </>
  )
}

export default DragDropStage