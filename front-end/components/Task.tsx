// components/Task.tsx
import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Flex, Box, Text, useColorModeValue, IconButton, useDisclosure } from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import Subtasks from './SubTasks'; 
import EditTaskModal from './EditTaskModal';

interface TaskProps {
  task: {
    id: number;
    content: string;
  };
  provided: DraggableProvided;
  deleteTask: (taskId: number) => void; // Add deleteTask to the props
  updateTask: (taskId: number, newContent: string) => void; // Function to call when edit is saved
}

const Task: React.FC<TaskProps> = ({ task, provided, deleteTask, updateTask }) => {
  const bgColor = useColorModeValue('gray.700', 'gray.800');
  const borderColor = useColorModeValue('gray.600', 'gray.700');
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isSubtasksOpen, onOpen: onSubtasksOpen, onClose: onSubtasksClose } = useDisclosure();


  return (
    <Flex
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      bg={bgColor}
      m={2}
      p={4}
      borderRadius="lg"
      boxShadow='0px 1px 3px rgba(0, 0, 0, 0.12)'
      border="1px solid"
      borderColor={borderColor}
      _hover={{
        background: useColorModeValue('gray.600', 'gray.700'),
      }}
      transition="background 0.1s, boxShadow 0.1s"
      position="relative"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box flex="1" minW="0">
        <Text
          color="whiteAlpha.900"
          fontSize="md"
          fontWeight="bold"
          isTruncated
          mr={8} // Add right margin to prevent text from overlapping icons
        >
          {task.content}
        </Text>
      </Box>
      <Box>
        <IconButton
          aria-label="Edit task"
          icon={<EditIcon />}
          size="sm"
          variant="ghost"
          colorScheme="purple"
          onClick={onEditOpen} // Open edit modal
          />
        <IconButton
          aria-label="Delete task"
          icon={<DeleteIcon />}
          size="sm"
          variant="ghost"
          colorScheme="red"
          ml={2} // Add margin for consistent spacing between icons
          onClick={() => deleteTask(task.id)} // Use deleteTask when the button is clicked
          />
        <IconButton
          aria-label="View subtasks"
          icon={<ViewIcon />}
          size="sm"
          variant="ghost"
          colorScheme="teal"
          onClick={onSubtasksOpen}
        />
      </Box>
      <Subtasks
        isOpen={isSubtasksOpen}
        onClose={onSubtasksClose}
        taskContent={task.content}
      />
      <EditTaskModal
      isOpen={isEditOpen}
      onClose={onEditClose}
      taskContent={task.content}
      onSave={(newContent) => updateTask(task.id, newContent)}
    />
    </Flex>
  );
};

export default Task;
