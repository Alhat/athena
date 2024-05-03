import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Text,
    ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface FilterMenuProps {
    fetchTasks: () => void;
    updateColumnFilter: (arg: string) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
    fetchTasks,
    updateColumnFilter,
}) => {
    return (
        <>
            <Menu>
                <MenuButton
                    as={Button}
                    colorScheme="green"
                    rightIcon={<ChevronDownIcon />}
                >
                    Filter
                </MenuButton>
                <MenuList
                    backgroundColor="#276749"
                    color="white"
                    borderWidth="0px"
                >
                    <MenuItem
                        _focus={{ bg: "green.500", color: "white" }} // Customize focused state colors
                        bg="#276749"
                        color="white"
                        onClick={() => updateColumnFilter("priority")}
                    >
                        Priority
                    </MenuItem>
                    <MenuItem
                        _focus={{ bg: "green.500", color: "white" }} // Repeat for each MenuItem
                        bg="#276749"
                        color="white"
                        onClick={() => {
                            updateColumnFilter("subtask_completion_percentage");
                        }}
                    >
                        Completion
                    </MenuItem>
                    <MenuItem
                        _focus={{ bg: "green.500", color: "white" }} // Customize focus style
                        bg="#276749"
                        color="white"
                        onClick={() => {
                            updateColumnFilter("due_date");
                        }}
                    >
                        Due Date
                    </MenuItem>
                    <MenuItem
                        _focus={{ bg: "green.500", color: "white" }} // Customize focus style
                        bg="#276749"
                        color="white"
                        onClick={() => {
                            updateColumnFilter("weight");
                        }}
                    >
                        Weight
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default FilterMenu;
