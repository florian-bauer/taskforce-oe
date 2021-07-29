import { Participants } from "@/components/list-item/components/participants";
import { Tooltip } from "@/components/list-item/components/tooltip";
import { AddIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";

const Head = ({ title, participants, actions }) => (
    <Flex alignItems="center" justifyContent="space-between">
        <Heading size="md" userSelect="none">
            {title}
        </Heading>
        <HStack spacing={12}>
            <HStack>
                {/* <Button size="sm" leftIcon={<ChevronUpIcon />}>
                    25
                </Button>
                <Tooltip label="Als Partizipant:in hinzufügen">
                    <IconButton
                        size="sm"
                        aria-label="Als Partizipant:in hinzufügen"
                        icon={<AddIcon />}
                    />
                </Tooltip> */}
                {actions}
            </HStack>
            <Participants participants={participants} />
        </HStack>
    </Flex>
);

export { Head };
