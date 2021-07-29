import {
    Badge,
    Content,
    Head,
    Wrapper,
} from "@/components/list-item/components";
import { useState } from "react";

const ListItem = ({
    title,
    description,
    badge,
    participants,
    creator,
    children,
}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Wrapper>
            <Badge colorScheme={badge.colorScheme}>{badge.label}</Badge>
            <Head
                title={title}
                participants={participants}
                actions={children}
            />
            <Content description={description} creator={creator} />
        </Wrapper>
    );
};

export { ListItem };
