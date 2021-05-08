import { CardController } from "@/controller/card-controller";
import { CreateTaskModal } from "@/controller/create-task-modal";
import { fetcher } from "@/lib/fetcher";
import {
    Divider,
    Flex,
    SimpleGrid,
    useBreakpointValue,
} from "@chakra-ui/react";
import { useAuthUser } from "next-firebase-auth";
import { Children } from "react";
import useSWR from "swr";

const GridController = () => {
    // Handling the Grid Responsiveness with different Props on different Breakpoints
    const SimpleGridProps = useBreakpointValue({
        base: { columns: 1 },
        sm: { minChildWidth: "400px" },
    });

    const { getIdToken } = useAuthUser();

    const { data, mutate } = useSWR("/api/tasks", (url) =>
        fetcher(url, "GET", getIdToken)
    );

    return (
        <Flex flexDir="column" px={6} pb={6}>
            <Divider />
            <SimpleGrid {...SimpleGridProps} spacing={6} mt={6}>
                {Children.toArray(
                    data?.tasks?.map((task) => <CardController {...task} />)
                )}
                <CreateTaskModal
                    onCreate={async () => await mutate("/api/tasks")}
                />
            </SimpleGrid>
        </Flex>
    );
};

export { GridController };
