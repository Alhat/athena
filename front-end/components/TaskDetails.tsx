import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
  Progress,
  Text,
  VStack,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import axios from "axios"; // Import axios for making HTTP requests

// Assuming you have these types defined somewhere in your project
type SubTask = {
  id: number;
  name: string;
  status: 'completed' | 'incomplete';
  // ... other subtask properties
};

type Task = {
    id: number; // Changed from number to string
    title: string;
    description: string;
    subTasks: TaskDataSubTasks[]; // Make sure this matches the structure of TaskDataSubTasks if needed
    taskID: string; // Is this meant to be the same as `id`?
    courseID: string;
    estimatedCompletionTime: number; // Match backend field name if different
    status: string;
  // ... other task properties
};

type TaskDataSubTasks = {
    description: string;
    status: string;
};

interface TaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ isOpen, onClose, task }) => {
  // Calculate the progress based on completed subtasks
  const [subTasks, setSubTasks] = useState<TaskDataSubTasks[]>(task.subTasks);

// Update calculateProgress to use local subTasks state
const calculateProgress = () => {
    const completedSubtasks = subTasks.filter(subtask => subtask.status === 'completed').length;
    return (completedSubtasks / subTasks.length) * 100;
  };

  // Handle status toggle
  const handleStatusToggle = async (subtaskId: string) => {
    // Update the status locally for immediate feedback
    const updatedSubTasks = subTasks.map(subtask => {
      if (subtask.description === subtaskId) {
        return { ...subtask, status: subtask.status === 'completed' ? 'incomplete' : 'completed' };
      }
      return subtask;
    });
    setSubTasks(updatedSubTasks);
  
    // Send the updated status to the backend
    try {
        const payload = {
          subtaskId,
          newStatus: updatedSubTasks.find(subtask => subtask.description === subtaskId)?.status,
        };
      
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/update-subtask-status`,
          payload,
          { withCredentials: true }
        );
      
        // Handle your response as necessary
        console.log(response.data);
      } catch (error) {
        console.error('Failed to update subtask status:', error);
        // Optionally handle the state revert here if the update fails
      }
  };
  
  const inactiveTabBg = useColorModeValue('gray.600', 'gray.700'); // Adjust as needed for light/dark modes
  const inactiveTabColor = useColorModeValue('gray.400', 'gray.500'); // Adjust for readability
  const activeTabColor = 'white'; // Adjust as needed for your theme

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent bg="column-bg">
        <ModalHeader color="white-text">{task.title}</ModalHeader>
        <ModalCloseButton color="white-text" />
        <ModalBody>
          <Tabs variant="enclosed">
            <TabList mb="1em">
            <Tab
            _selected={{ color: activeTabColor, borderColor: 'white' }}
            _focus={{ boxShadow: 'none' }}
            color={inactiveTabColor} // Apply inactive tab color here
            bg={inactiveTabBg} // Apply inactive tab background here
          >
            Description
          </Tab>
          <Tab
            _selected={{ color: activeTabColor, borderColor: 'white' }}
            _focus={{ boxShadow: 'none' }}
            color={inactiveTabColor} // Apply inactive tab color here
            bg={inactiveTabBg} // Apply inactive tab background here
          >
            Subtasks
          </Tab>
          </TabList>
            <TabPanels>
              <TabPanel>
                <Text color="white-text" fontSize="lg">{task.description}</Text>
              </TabPanel>
              <TabPanel>
                <VStack align="stretch">
                  {task.subTasks.map((subtask) => (
                    <HStack key={subtask.status} justify="space-between">
                      <Text color="white-text">{subtask.description}</Text>
                      <Switch isChecked={subtask.status === 'completed'} onChange={() => handleStatusToggle(subtask.description)} />
                    </HStack>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Progress colorScheme="green" size="lg" value={calculateProgress()} w="full" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskDetails;
