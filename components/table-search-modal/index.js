import { ConfirmModal } from "@/components/confirm-modal";
import {
    Table,
    Tbody,
    Td,
    Tr,
    VStack,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Children, useState } from "react";

const TableSearchModal = ({ open, header, labelClose, content, filter }) => {
    const [list, setList] = useState(content.list);

    return (
        <ConfirmModal
            open={open}
            header={header}
            labelConfirm={labelClose}
            px={0}
            maxH={96}
            body={
                <VStack spacing={6}>
                    <FormControl px={6}>
                        <Input
                            placeholder="Suche"
                            onChange={(event) => {
                                const value = event.target.value;

                                if (value.trim().length <= 0)
                                    return setList(content.list);

                                const filtered = filter(value, list);
                                setList(filtered);
                            }}
                        />
                    </FormControl>

                    <Table variant="striped" colorScheme="gray">
                        <Tbody>
                            {Children.toArray(
                                list.map((params) => (
                                    <Tr>
                                        <Td>{content.body(params)}</Td>
                                    </Tr>
                                ))
                            )}
                        </Tbody>
                    </Table>
                </VStack>
            }
        />
    );
};

TableSearchModal.propTypes = {
    open: PropTypes.func.isRequired,
    header: PropTypes.any.isRequired,
    labelClose: PropTypes.string.isRequired,
    content: PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
        body: PropTypes.func.isRequired,
    }).isRequired,
    filter: PropTypes.func.isRequired,
};

export { TableSearchModal };
