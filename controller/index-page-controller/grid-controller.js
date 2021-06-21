import { CardButton } from "@/components/card-button";
import { EmptyState } from "@/components/empty-state";
import { ALL, VOTING } from "@/constants/status";
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
import { Children, useEffect, useState } from "react";
import useSWR from "swr";

const GridController = ({ filterStatus }) => {
    const [tasks, setTasks] = useState([]);
    const { getIdToken } = useAuthUser();

    const { data, mutate } = useSWR("/api/tasks", (url) =>
        fetcher(url, "GET", getIdToken)
    );

    useEffect(() => {
        if (!data || !filterStatus) return;

        const voteSortedTasks = data?.tasks?.sort(
            (a, b) => b.votes.length - a.votes.length
        );

        if (filterStatus === ALL) {
            setTasks(voteSortedTasks);
            return;
        }

        const sortedByStatusTasks = voteSortedTasks?.filter(
            (task) => task?.status === filterStatus
        );

        if (filterStatus === VOTING) {
            setTasks(sortedByStatusTasks);
            return;
        }

        const sortedByDateTasks = sortedByStatusTasks?.sort((a, b) => {
            const dateA = new Date(a.statusSince);
            const dateB = new Date(b.statusSince);

            return dateA.getTime() - dateB.getTime();
        });
        setTasks(sortedByDateTasks);
    }, [data, filterStatus]);

    // Handling the Grid Responsiveness with different Props on different Breakpoints
    const SimpleGridProps = useBreakpointValue({
        base: { columns: 1 },
        sm: { minChildWidth: "500px" },
    });

    const showEmptyState = tasks.length <= 0;

    return (
        <Flex flexDir="column" px={6} pb={6}>
            <Divider />
            <SimpleGrid {...SimpleGridProps} spacing={6} mt={6}>
                {showEmptyState ? (
                    <EmptyState
                        title="Aktuell ist kein Task hier aufgelistet"
                        subtitle="Versuche es doch mit einem anderen Tab"
                    />
                ) : (
                    Children.toArray(
                        tasks?.map((task) => (
                            <CardController data={task} mutate={mutate} />
                        ))
                    )
                )}

                {filterStatus === VOTING && (
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
                )}
            </SimpleGrid>
        </Flex>
    );
};

export { GridController };
