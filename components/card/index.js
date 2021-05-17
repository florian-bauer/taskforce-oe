import { Badge } from "@/components/card/components/badge";
import { Body } from "@/components/card/components/body";
import { Footer } from "@/components/card/components/footer";
import { Header } from "@/components/card/components/header";
import { Wrapper } from "@/components/card/components/wrapper";
import { Divider } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Card = ({
    badge,
    creator,
    participants,
    title,
    description,
    children,
    ...props
}) => (
    <Wrapper {...props}>
        <Badge colorScheme={badge.colorScheme}>{badge.label}</Badge>
        <Header creator={creator} participants={participants} />
        <Divider borderColor="rgba(0, 0, 0, .05)" opacity={1} my={6} />
        <Body title={title} description={description} />
        <Footer>{children}</Footer>
    </Wrapper>
);

Card.propTypes = {
    badge: PropTypes.shape({
        colorScheme: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    creator: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }).isRequired,
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export { Card };
