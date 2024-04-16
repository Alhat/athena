import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import React from "react";

interface ManualTaskMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const ManualTaskMenu: React.FC<ManualTaskMenuProps> = ({ isOpen, onClose }) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [description, setDescription] = React.useState("");

    const handleInputChange = (e: { target: { value: any } }) => {
        let inputValue = e.target.value;
        setDescription(inputValue);
    };

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent bg="column-bg">
                <ModalHeader color={"white"}>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel color={"white"}>Assignment Title</FormLabel>
                        <Input
                            ref={initialRef}
                            placeholder="Title"
                            color="white"
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel color={"white"}>Due Date</FormLabel>
                        <Input placeholder="202X-MM-DD" color="white" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel color={"white"}>Class Name</FormLabel>
                        <Input placeholder="Class 101" color="white" />
                    </FormControl>

                    <FormControl>
                        <FormLabel color={"white"}>
                            Assignment Description
                        </FormLabel>
                        <Textarea
                            value={description}
                            onChange={handleInputChange}
                            placeholder="Assignment description."
                            size="sm"
                            color="white"
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ManualTaskMenu;
