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
    headChildren,
}) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <Wrapper>
            <Badge colorScheme={badge.colorScheme}>{badge.label}</Badge>
            <Head
                title={title}
                participants={participants}
                actions={children}
                onClick={(event) => {
                    if (
                        event.target instanceof HTMLDivElement ||
                        event.target instanceof HTMLHeadingElement
                    ) {
                        setOpen(!isOpen);
                    }
                }}
            >
                {headChildren}
            </Head>
            {isOpen && <Content description={description} creator={creator} />}
        </Wrapper>
    );
};

export { ListItem };
