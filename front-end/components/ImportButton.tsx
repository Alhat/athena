import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import axios from "axios";
import ManualTaskMenu from "./ManualTaskMenu";
import { useState } from "react";

interface ImportButtonProps {
    fetchTasks: () => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ fetchTasks }) => {
    const [isManualTaskMenuOpen, setIsManualTaskMenuOpen] =
        useState<boolean>(false);

    const onClose = () => {
        setIsManualTaskMenuOpen(false);
    };

    const importAllAssignments = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/db/import/all-assignments`,
                { withCredentials: true }
            );

            if (response.data.message > 0) {
                fetchTasks();
            } else {
                throw new Error("Unsuccessful import all assignments");
            }
        } catch (error) {
            console.error("Failed to import all tasks:", error);
        }
    };

    return (
        <>
            <Menu>
                <MenuButton
                    as={Button}
                    colorScheme="green"
                    rightIcon={<ChevronDownIcon />}
                >
                    Import
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
                        onClick={importAllAssignments}
                    >
                        Import All
                    </MenuItem>
                    <MenuItem
                        _focus={{ bg: "green.500", color: "white" }} // Repeat for each MenuItem
                        bg="#276749"
                        color="white"
                    >
                        Import Selected
                    </MenuItem>
                    <MenuItem
                        _focus={{ bg: "green.500", color: "white" }} // Customize focus style
                        bg="#276749"
                        color="white"
                        onClick={() => {
                            setIsManualTaskMenuOpen(true);
                        }}
                    >
                        Manual Task
                    </MenuItem>
                </MenuList>
            </Menu>
            <ManualTaskMenu isOpen={isManualTaskMenuOpen} onClose={onClose} />
        </>
    );
};

export default ImportButton;
