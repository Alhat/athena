'use client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Card from "@/components/home/card";
import Task from "@/components/home/task"; // Import the Task component

// Simplified example tasks and columns for demonstration
const tasks = {
  'task-1': { id: 'task-1', content: 'Task 1' },
  'task-2': { id: 'task-2', content: 'Task 2' },
  'task-3': { id: 'task-3', content: 'Task 3' },
};

const columns = {
  'todo': { id: 'todo', title: 'To Do', taskIds: ['task-1', 'task-2'] },
  'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
  'done': { id: 'done', title: 'Completed', taskIds: ['task-3'] },
};

// Handling the end of a drag event
const onDragEnd = (result) => {
  // Placeholder for your logic to reorder tasks or move them between columns
};

export default function Home() {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, column], index) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <Card title={column.title} large={true}>
                    {column.taskIds.map((taskId, index) => (
                      <Task key={taskId} id={taskId} index={index} content={tasks[taskId].content} />
                    ))}
                    {provided.placeholder}
                  </Card>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
