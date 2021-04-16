import { CardBadge } from "@/components/card/CardBadge";
import { CardBody } from "@/components/card/CardBody";
import { CardFooter } from "@/components/card/CardFooter";
import { CardHeader } from "@/components/card/CardHeader";
import { defaultProps, propTypes } from "@/components/card/props";
import { DELETED, FINISHED, PROGRESS, VOTING } from "@/constants/status";
import { useBoolean } from "@/hooks/useBoolean";
import { useOptions } from "@/hooks/useOptions";
import { Divider, Flex } from "@chakra-ui/react";

const Card = ({
    name,
    avatar,
    participants,
    title,
    description,
    status,
    is,
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
            maxW="500px"
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
            <CardFooter status={status} is={is} pt={6 + 2} />
        </Flex>
    );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export { Card };
