// components/Task.tsx
import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import {
    Flex,
    Box,
    Text,
    useColorModeValue,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import Subtasks from "./SubTasks";
import EditTaskModal from "./EditTaskModal";
import internal from "stream";
import TaskDetails from "./TaskDetails";

type TaskDataSubTasks = {
    description: string;
    status: string;
};

interface TaskProps {
    task: {
        id: number; // Changed from number to string... ??? Still a number, use taskID to access stuff in database
        title: string;
        description: string;
        subTasks: TaskDataSubTasks[]; // Make sure this matches the structure of TaskDataSubTasks if needed
        taskID: string; // Is this meant to be the same as `id`? From my understanding, `id` is the frontend id for dragging, taskID is for the database
        courseID: string;
        estimatedCompletionTime: number; // Match backend field name if different
        status: string;
    };
    provided: DraggableProvided;
    deleteTask: (taskId: string) => void; // Add deleteTask to the props
    updateTask: (taskId: string, newContent: string) => void; // Function to call when edit is saved
}

const Task: React.FC<TaskProps> = ({
    task,
    provided,
    deleteTask,
    updateTask,
}) => {
    const bgColor = useColorModeValue("gray.700", "gray.800");
    const borderColor = useColorModeValue("gray.600", "gray.700");
    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onClose: onEditClose,
    } = useDisclosure();
    const {
        isOpen: isSubtasksOpen,
        onOpen: onSubtasksOpen,
        onClose: onSubtasksClose,
    } = useDisclosure();

    return (
        <Flex
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            bg={bgColor}
            m={2}
            p={4}
            borderRadius="lg"
            boxShadow="0px 1px 3px rgba(0, 0, 0, 0.12)"
            border="1px solid"
            borderColor={borderColor}
            _hover={{
                background: useColorModeValue("gray.600", "gray.700"),
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
                    {task.title}
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
                    onClick={() => deleteTask(task.taskID)} // Use deleteTask when the button is clicked
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
            <TaskDetails
                isOpen={isSubtasksOpen}
                onClose={onSubtasksClose}
                task={task}  // Need to change the stuff displayed here later
            />
            <EditTaskModal
                isOpen={isEditOpen}
                onClose={onEditClose}
                taskContent={task.description}
                onSave={(newContent) => updateTask(task.taskID, newContent)}
            />
        </Flex>
    );
};

export default Task;
