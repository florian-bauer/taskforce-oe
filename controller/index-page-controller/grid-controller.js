import { CardButton } from "@/components/card-button";
import { EmptyState } from "@/components/empty-state";
import { ALL, VOTING } from "@/constants/status";
import { CreateTaskController } from "@/controller/create-task-controller";
import { ListItemController } from "@/controller/list-item-controller";
import { fetcher } from "@/lib/fetcher";
import { AddIcon } from "@chakra-ui/icons";
import { Divider, Flex } from "@chakra-ui/react";
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

    return (
        <Flex flexDir="column" px={6} pb={6} height="100%">
            <Divider />
            <Flex flexDirection="column" height="100%">
                {tasks?.length <= 0 && (
                    <EmptyState
                        title="Keine Vorschläge hier 🔍"
                        subtitle="Aktualisiere die Seite oder erstelle einen Vorschlag"
                    />
                )}

                {Children.toArray(
                    tasks?.map((task) => (
                        <ListItemController data={task} mutate={mutate} />
                    ))
                )}

                {filterStatus === VOTING && (
                    <CreateTaskController
                        open={(onOpen) => (
                            <CardButton
                                mt={6}
                                pb={12}
                                label="Vorschlag erstellen"
                                icon={<AddIcon />}
                                onClick={onOpen}
                            />
                        )}
                        onCreate={async () => await mutate("/api/tasks")}
                    />
                )}
            </Flex>
        </Flex>
    );
};

export { GridController };
