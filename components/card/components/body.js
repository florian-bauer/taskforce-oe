import { Heading, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Body = ({ title, description }) => (
    <VStack alignItems="flex-start">
        <Heading fontWeight="semibold" fontSize="18px">
            {title}
        </Heading>
        <Text fontSize="sm">{description}</Text>
    </VStack>
);

Body.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export { Body };
