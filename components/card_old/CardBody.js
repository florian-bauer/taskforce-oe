import { Heading, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CardBody = ({ title, description, ...props }) => (
    <VStack alignItems="flex-start" {...props}>
        <Heading fontWeight="semibold" fontSize="18px">
            {title}
        </Heading>
        <Text fontSize="sm">{description}</Text>
    </VStack>
);

CardBody.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export { CardBody };
