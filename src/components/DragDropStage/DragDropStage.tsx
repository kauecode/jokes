import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';
import { TwoPartJoke } from '../../types/types';
import WinnerScreen from '../WinnerScreen';

interface DragDropStageProps {
  jokes: TwoPartJoke[]
}

const DragDropStage = ({jokes} : DragDropStageProps) => {

  const [winner, setWinner] = useState(false);

  console.log("Render");

  const [dragItems, setDragItems] = useState(
    jokes.map(joke => ({ id: joke.id, setup: joke.setup, where: 0 }))
  );

  const [dropAreas, setDropAreas] = useState(
    [...jokes]
      .sort(() => Math.random() - 0.5)
      .map(joke => ({ id: joke.id, delivery: joke.delivery, full: false, who: 0 }))
  );  

  const handleDragEnd = ( { active, over } : DragEndEvent) => {
    const activeId = Number(active.id);
    if (over) {
      const overIdFormatedToNumber = Number(over.id);
      const targetDragArea = dropAreas.find(item => item.id === overIdFormatedToNumber);
      if (!targetDragArea?.full) {
        setDropAreas(prevState => 
          prevState.map(item => 
            item.who === activeId
            ? {...item, full: false, who: 0}
            : item
        ));               
        setDropAreas(prevState => 
          prevState.map(item => 
            item.id === overIdFormatedToNumber
            ? {...item, full: true, who: activeId}
            : item
        ));    
        setDragItems(prevState =>
          prevState.map(item => 
            item.id === activeId  
            ? { ...item, where: overIdFormatedToNumber }
            : item
          )
        );        
      } 
    } else {
      setDropAreas(prevState => 
        prevState.map(item => 
          item.who === activeId
          ? {...item, full: false, who: 0}
          : item
      ));      
      setDragItems(prevState =>
        prevState.map(item =>
          item.id === activeId 
            ? { ...item, where: 0}
            : item
        )
      );
    }
  }    

  useEffect(() => {
    setWinner(dragItems.every(item => item.id === item.where));    
  }, [dragItems]);

  return (
    <>
      <WinnerScreen isVisible={winner} handlePlayAgain={() => console.log(1)}/>
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
                transform: winner ? "rotate(400deg) scale(2)" : "rotate(0deg) scale(1)",
                opacity: winner ? 0 : 0.1 ,                
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