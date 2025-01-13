import {useDroppable} from '@dnd-kit/core';
import { Paper } from '@mui/material';

interface DroppableProps {
  children: any,
  id: number,
  who: number
}

const Droppable = ({children, id, who}:DroppableProps) => {

  const {isOver, setNodeRef} = useDroppable({ id: id });
  
  const style = { opacity: isOver ? 1 : 0.8 };

  let isMatchedColor = "white"; 
  if (who !== 0)
    isMatchedColor = (id === who) ? "#00b300" : "#bb0000";

  return (
    <Paper 
      ref={setNodeRef} 
      style={style} 
      elevation={0}
      sx={{
        bgcolor: isMatchedColor,
        p:2, 
        width: 1, 
        my:1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
        minHeight: '90px',
      }}>
      {children}
    </Paper>
  );
}

export default Droppable;