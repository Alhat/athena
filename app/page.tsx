'use client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Card from "@/components/home/card";
import Task from "@/components/home/task"; // Import the Task component

// Example state structure
const columns = {
  'todo': { id: 'todo', title: 'To Do', taskIds: ['task-1', 'task-2'] },
  'in-progress': { id: 'in-progress', title: 'In Progress', taskIds: [] },
  'done': { id: 'done', title: 'Completed', taskIds: ['task-3'] }
};

const tasks = {
  'task-1': { id: 'task-1', content: 'Task 1' },
  'task-2': { id: 'task-2', content: 'Task 2' },
  'task-3': { id: 'task-3', content: 'Task 3' }
};

export default function Home() {
  // Handle the end of a drag event
  const onDragEnd = (result) => {
    // Logic to reorder tasks or move them between columns
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(columns).map((column) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <Card title={column.title} large={false}>
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[200px]"
                >
                  {column.taskIds.map((taskId, index) => (
                    <Task key={taskId} id={taskId} index={index} content={tasks[taskId].content} />
                  ))}
                  {provided.placeholder}
                </div>
              </Card>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
