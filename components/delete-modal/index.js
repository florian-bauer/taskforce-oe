import { Button } from "@/components/button";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const DeleteModal = ({ onDelete, label, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} label={label} {...props} />
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bist du dir sicher?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Du kannst den Vorschlag dann nicht mehr herstellen!
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr={3}
                            onClick={onClose}
                            label="Vorschlag behalten"
                        />
                        <Button
                            label="Endgültig löschen"
                            primary
                            background="red.500"
                            _hover={{ bg: "red.400" }}
                            _active={{ bg: "red.300" }}
                            onClick={onDelete}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

DeleteModal.defaultProps = {
    label: "Open Modal",
};

DeleteModal.propTypes = {
    label: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
};

export { DeleteModal };
