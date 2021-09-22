import { Divider, Text, Flex } from "@chakra-ui/react";
import { Creator } from "@/components/list-item/components/creator";

const Content = ({ description, creator }) => (
    <>
        <Divider borderColor="rgba(0, 0, 0, .05)" opacity={1} my={6} />

        <Text fontSize="sm" whiteSpace="pre-line">
            {description}
        </Text>

        <Flex mt={10}>
            <Creator name={creator.name} avatar={creator.avatar} />
        </Flex>
    </>
);

export { Content };
