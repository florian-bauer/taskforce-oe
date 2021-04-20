import { ConfirmModal } from "@/components/confirm-modal";
import {
    Avatar,
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children } from "react";

const TableModal = ({ open, header, labelClose, content }) => (
    <ConfirmModal
        open={open}
        header={header}
        labelConfirm={labelClose}
        px={0}
        maxH={96}
        body={
            <Table variant="striped" colorScheme="gray">
                <Tbody>
                    {Children.toArray(
                        content.list.map((params) => (
                            <Tr>
                                <Td>{content.body(params)}</Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        }
    />
);

TableModal.propTypes = {
    open: PropTypes.func.isRequired,
    header: PropTypes.any.isRequired,
    labelClose: PropTypes.string.isRequired,
    content: PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
        body: PropTypes.func.isRequired,
    }).isRequired,
};

export { TableModal };
