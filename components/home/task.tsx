'use client';

import { Draggable } from 'react-beautiful-dnd';

const Task = ({ id, index, content }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-2 mb-2 bg-white rounded shadow"
        >
          {content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
