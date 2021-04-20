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

const ConfirmModal = ({
    open,
    header,
    body,
    labelConfirm,
    onConfirm,
    ...props
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
                    <ModalBody {...props}>{body}</ModalBody>
                    <ModalFooter>
                        <Button
                            primary
                            label={labelConfirm}
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

ConfirmModal.propTypes = {
    open: PropTypes.func.isRequired,
    header: PropTypes.any.isRequired,
    body: PropTypes.any.isRequired,
    labelConfirm: PropTypes.string.isRequired,
    onConfirm: PropTypes.func,
};

ConfirmModal.defaultProps = {
    onConfirm: () => {},
};

export { ConfirmModal };
