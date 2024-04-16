// components/Subtasks.tsx
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

interface SubtasksProps {
  isOpen: boolean;
  onClose: () => void;
  taskContent: string;
}

const Subtasks: React.FC<SubtasksProps> = ({ isOpen, onClose, taskContent }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>{taskContent} - Subtasks</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Here you would render the subtasks or other details */}
          {/* You can also pass down subtasks as props if needed */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* Other modal actions */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Subtasks;
