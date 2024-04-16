import React from 'react';
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
  const calculateProgress = () => {
    const completedSubtasks = task.subTasks.filter(subtask => subtask.status === 'completed').length;
    return (completedSubtasks / task.subTasks.length) * 100;
  };

  // Handle status toggle
  const handleStatusToggle = (subtaskId: string) => {
    // Update the status of the subtask
    // Note: This is where you'd also update the backend or state
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
                      <Switch isChecked={subtask.status === 'completed'} onChange={() => handleStatusToggle(subtask.status)} />
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
