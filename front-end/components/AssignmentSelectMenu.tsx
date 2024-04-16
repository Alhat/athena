import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    Checkbox,
    CheckboxGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { Console } from "console";
import React, { useEffect, useState } from "react";

interface asmProps {
    isOpen: boolean;
    onClose: () => void;
    fetchTasks: () => void;
}

interface Assignment {
    id: string;
    course_id: string;
    description: string;
    due_date: string;
    title: string;
    user: string;
    weight: string;
}

const AssignmentSelectMenu: React.FC<asmProps> = ({
    isOpen,
    onClose,
    fetchTasks,
}) => {
    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">(
        "inside"
    );
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedAssignmentIDs, setSelectedAssignmentIDs] = useState<
        string[]
    >([]);
    const btnRef = React.useRef(null);

    const handleCheckboxChange = (checkedValues: string[]) => {
        setSelectedAssignmentIDs(checkedValues);
    };

    const fetchAssignments = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/db/assignments`,
                { withCredentials: true }
            );

            if (!response.data) {
                throw new Error("Failed to get assignments");
            }

            console.log(response.data);
            setAssignments(response.data);
        } catch (error) {
            console.error("Error: " + error);
        }
    };

    useEffect(() => {
        if (isOpen) fetchAssignments();
    }, [isOpen]);

    return (
        <>
            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior={scrollBehavior}
            >
                <ModalOverlay />
                <ModalContent bg="column-bg">
                    <ModalHeader color="white">Select Assignments</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody color="white">
                        <CheckboxGroup
                            colorScheme="green"
                            value={selectedAssignmentIDs}
                            onChange={handleCheckboxChange}
                        >
                            <Stack spacing={[1, 5]} direction={"column"}>
                                {assignments.map((assignment) => (
                                    <Checkbox
                                        key={assignment.id}
                                        value={assignment.id}
                                    >
                                        {assignment.title}
                                    </Checkbox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    </ModalBody>
                    <ModalFooter color="white">
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AssignmentSelectMenu;
