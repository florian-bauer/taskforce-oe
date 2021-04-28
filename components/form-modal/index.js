import { Button } from "@/components/button";
import {
    FormControl,
    FormLabel,
    Input,
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
import { Children } from "react";

const FormModal = ({
    open,
    header,
    inputs,
    labelAbort,
    labelAction,
    onAction,
    disabled,
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
                    <ModalHeader>{header}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {Children.toArray(
                            inputs.map(({ label, onChange }, index) => (
                                <FormControl mt={index !== 0 && 4}>
                                    <FormLabel>{label}</FormLabel>
                                    <Input
                                        placeholder={label}
                                        onChange={onChange}
                                    />
                                </FormControl>
                            ))
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} label={labelAbort} />
                        <Button
                            disabled={disabled}
                            onClick={() => onAction(onClose)}
                            primary
                            label={labelAction}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

FormModal.propTypes = {
    open: PropTypes.func.isRequired,
    header: PropTypes.any.isRequired,
    inputs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onChange: PropTypes.func,
        }).isRequired
    ),
    labelAbort: PropTypes.string.isRequired,
    labelAction: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

FormModal.defaultProps = {
    disabled: false,
};

export { FormModal };
