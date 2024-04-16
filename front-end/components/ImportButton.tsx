import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from "@chakra-ui/react";

const ImportButton: React.FC = () => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                colorScheme="green"
                rightIcon={<ChevronDownIcon />}
            >
                Import
            </MenuButton>
            <MenuList backgroundColor="#276749" color="white" borderWidth="0px">
                <MenuItem
                    _focus={{ bg: "green.500", color: "white" }}  // Customize focused state colors
                    bg="#276749"
                    color="white"
                >
                    Import All
                </MenuItem>
                <MenuItem
                    _focus={{ bg: "green.500", color: "white" }}  // Repeat for each MenuItem
                    bg="#276749"
                    color="white"
                >
                    Import Selected
                </MenuItem>
                <MenuItem
                    _focus={{ bg: "green.500", color: "white" }}  // Customize focus style
                    bg="#276749"
                    color="white"
                >
                    Manual Task
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ImportButton;
