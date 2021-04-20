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

const ActionModal = ({
    open,
    header,
    body,
    labelAbort,
    labelAction,
    onAction,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {open(onOpen)}
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>{header}</ModalHeader>
                    <ModalBody>{body}</ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose} label={labelAbort} />
                        <Button
                            label={labelAction}
                            primary
                            background="red.500"
                            _hover={{ bg: "red.400" }}
                            _active={{ bg: "red.300" }}
                            onClick={() => onAction(onClose)}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

ActionModal.propTypes = {
    open: PropTypes.func.isRequired,
    header: PropTypes.any.isRequired,
    body: PropTypes.any.isRequired,
    labelAbort: PropTypes.string.isRequired,
    labelAction: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
};

export { ActionModal };
