
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { Button } from '@mui/material';

interface DraggableProps {
  children: any,
  id: number,
  where: number
}

const Draggable = ({children, id, where} : DraggableProps) => {
 
  const {attributes, listeners, setNodeRef, transform} = useDraggable({id: id});
  
  const style = { transform: CSS.Translate.toString(transform) };

  let isMatchedColor = "primary.main"; 
  if (where !== 0)
    isMatchedColor = (id === where) ? "green" : "red";

  return (
    <Button
      variant='contained'
      sx={{
        display: "inline-block",
        p:0.7, 
        width: 1, 
        textTransform: "initial", 
        fontSize: "1rem", 
        lineHeight: "1.2rem",
        bgcolor: isMatchedColor
      }}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}>
      {children}
    </Button>
  );
}

export default Draggable;
