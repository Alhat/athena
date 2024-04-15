// components/KanbanBoard.tsx

import initialData from '../data/data.json'; // Path to your data.json file
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Flex, Heading, Text } from '@chakra-ui/react';

const Column = dynamic(() => import('../components/Column'), { ssr: false });

interface Task {
  id: number;
  content: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: number[];
}

interface InitialData {
  tasks: { [key: number]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}


  const reorderColumnList = (sourceCol: Column, startIndex: number, endIndex: number): Column => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);
  
    return { ...sourceCol, taskIds: newTaskIds };
  };
  
  const KanbanBoard: React.FC = () => {
    const [state, setState] = useState<InitialData>(initialData);
  
    const onDragEnd = (result) => {
        const { destination, source } = result;
    
        // If user tries to drop in an unknown destination
        if (!destination) return;
    
        // if the user drags and drops back in the same position
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }
    
        // If the user drops within the same column but in a different positoin
        const sourceCol = state.columns[source.droppableId];
        const destinationCol = state.columns[destination.droppableId];
    
        if (sourceCol.id === destinationCol.id) {
          const newColumn = reorderColumnList(
            sourceCol,
            source.index,
            destination.index
          );
    
          const newState = {
            ...state,
            columns: {
              ...state.columns,
              [newColumn.id]: newColumn,
            },
          };
          setState(newState);
          return;
        }
    
        // If the user moves from one column to another
        const startTaskIds = Array.from(sourceCol.taskIds);
        const [removed] = startTaskIds.splice(source.index, 1);
        const newStartCol = {
          ...sourceCol,
          taskIds: startTaskIds,
        };
    
        const endTaskIds = Array.from(destinationCol.taskIds);
        endTaskIds.splice(destination.index, 0, removed);
        const newEndCol = {
          ...destinationCol,
          taskIds: endTaskIds,
        };
    
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newStartCol.id]: newStartCol,
            [newEndCol.id]: newEndCol,
          },
        };
    
        setState(newState);
      };

  // Add a new function to handle task deletion
  const deleteTask = (taskId: number) => {
    // Remove the task from the tasks object
    const newTasks = { ...state.tasks };
    delete newTasks[taskId];

    // Remove the task from all columns
    const newColumns = { ...state.columns };
    Object.keys(newColumns).forEach(columnId => {
      newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(id => id !== taskId);
    });

    // Update the state
    setState({
      ...state,
      tasks: newTasks,
      columns: newColumns,
    });
  };

  const updateTask = (taskId: number, newContent: string) => {
    const updatedTasks = {
      ...state.tasks,
      [taskId]: { ...state.tasks[taskId], content: newContent },
    };
    setState({ ...state, tasks: updatedTasks });
  };
  const createTask = () => {
    console.log('createTask called'); // Debugging log
    const newTaskId = Math.max(...Object.keys(state.tasks).map(Number)) + 1; // Generate a new ID
    const newTask = {
      id: newTaskId,
      content: 'New Task' // Default content for new tasks
    };

    const newTasks = {
      ...state.tasks,
      [newTaskId]: newTask
    };

    // Assuming 'backlog' is the ID of your Backlog column
    const newBacklogColumn = {
      ...state.columns['column-1'],
      taskIds: [...state.columns['column-1'].taskIds, newTaskId]
    };

    const newColumns = {
      ...state.columns,
      ['column-1']: newBacklogColumn
    };

    setState({
      ...state,
      tasks: newTasks,
      columns: newColumns
    });
  };
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex py="2rem" flexDir="column" align="center">
        </Flex>

        <Flex justify="space-between" px="4rem">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            console.log(`Column: ${columnId}, onCreateTask:`, columnId === 'column-1' ? createTask : undefined);

            return (
              <Column 
                key={column.id} 
                column={column} 
                tasks={tasks}
                deleteTask={deleteTask} // Pass deleteTask to Column
                updateTask={updateTask} // Here you pass updateTask to the Column
                onCreateTask={columnId === 'column-1' ? createTask : undefined} // Only pass createTask to the Backlog column
              />
            );
          })}
        </Flex>
      </Flex>
      </DragDropContext>
    );
  };
  
  export default KanbanBoard;
