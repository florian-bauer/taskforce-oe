import { CardBadge } from "@/components/card_old/CardBadge";
import { CardBody } from "@/components/card_old/CardBody";
import { CardFooter } from "@/components/card_old/CardFooter";
import { CardHeader } from "@/components/card_old/CardHeader";
import { defaultProps, propTypes } from "@/components/card_old/props";
import { DELETED, FINISHED, PROGRESS, VOTING } from "@/constants/status";
import { useBoolean, useOptions } from "@/hooks";
import { Divider, Flex } from "@chakra-ui/react";

const Card = ({
    name,
    avatar,
    participants,
    title,
    description,
    status,
    is,
    events,
    components,
    ...props
}) => {
    // Users (non-owners & non-admins) should not be able to see the card when it is "deleted"
    if (!is.owner && !is.administrator && status === DELETED) return <></>;

    const colorScheme = useOptions(status, [
        { is: VOTING, be: "purple" },
        { is: PROGRESS, be: "orange" },
        { is: FINISHED, be: "green" },
        { is: DELETED, be: "red" },
    ]);

    const label = useOptions(status, [
        { is: VOTING, be: "Voting" },
        { is: PROGRESS, be: "In Arbeit" },
        { is: FINISHED, be: "Abgeschlossen" },
        { is: DELETED, be: "Gelöscht" },
    ]);

    const { useFlag } = useBoolean(is.owner);
    const borderColor = useFlag(`${colorScheme}.200`, "rgba(0, 0, 0, .05)");

    return (
        <Flex
            bg="gray.50"
            border="1px solid"
            borderColor={borderColor}
            borderRadius={10}
            w="100%"
            p={6}
            position="relative"
            flexDirection="column"
            boxShadow={is.owner && "lg"}
            {...props}
        >
            <CardBadge colorScheme={colorScheme} label={label} />
            <CardHeader
                name={name}
                avatar={avatar}
                participants={participants}
                mb={6}
            />
            <Divider borderColor="rgba(0, 0, 0, .05)" opacity={1} mb={6} />
            <CardBody title={title} description={description} />
            <CardFooter
                status={status}
                is={is}
                events={events}
                components={components}
                pt={6 + 2}
            />
        </Flex>
    );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export { Card };
