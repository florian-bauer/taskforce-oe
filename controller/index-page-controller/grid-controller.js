import { CardButton } from "@/components/card-button";
import { CardController } from "@/controller/card-controller";
import { CreateTaskController } from "@/controller/create-task-controller";
import { fetcher } from "@/lib/fetcher";
import { AddIcon } from "@chakra-ui/icons";
import {
    Divider,
    Flex,
    SimpleGrid,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useAuthUser } from "next-firebase-auth";
import { Children, useState, useEffect } from "react";
import useSWR from "swr";

const GridController = () => {
    const [tasks, setTasks] = useState([]);
    const { getIdToken } = useAuthUser();

    const { data, mutate } = useSWR("/api/tasks", (url) =>
        fetcher(url, "GET", getIdToken)
    );

    useEffect(() => {
        if (!data) return;

        // Sorting Tasks after Votes (Tasks with most Votes first)
        const sortedTasks = data?.tasks?.sort(
            (a, b) => b.votes.length - a.votes.length
        );

        setTasks(sortedTasks);
    }, [data]);

    // Handling the Grid Responsiveness with different Props on different Breakpoints
    const SimpleGridProps = useBreakpointValue({
        base: { columns: 1 },
        sm: { minChildWidth: "400px" },
    });

    return (
        <Flex flexDir="column" px={6} pb={6}>
            <Divider />
            <SimpleGrid {...SimpleGridProps} spacing={6} mt={6}>
                {Children.toArray(
                    tasks?.map((task) => (
                        <CardController data={task} mutate={mutate} />
                    ))
                )}

                <CreateTaskController
                    open={(onOpen) => (
                        <CardButton
                            label="Vorschlag erstellen"
                            icon={<AddIcon />}
                            onClick={onOpen}
                        />
                    )}
                    onCreate={async () => await mutate("/api/tasks")}
                />
            </SimpleGrid>
        </Flex>
    );
};

export { GridController };
