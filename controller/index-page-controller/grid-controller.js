import { CardController } from "@/controller/card-controller_old";
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
import { Card } from "@/components/card";
import { Button } from "@/components/button";

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
                <Card
                    badge={{ colorScheme: "purple", label: "Voting" }}
                    creator={{ name: "Florian Bauer", avatar: "" }}
                    participants={[
                        { name: "Florian Bauer", avatar: "" },
                        { name: "Florian Bauer", avatar: "" },
                        { name: "Florian Bauer", avatar: "" },
                    ]}
                    title="Hello World"
                    description="Das ist ein test"
                >
                    <Button w="100%" label="Test" onClick={() => {}} primary />
                    <Button w="100%" label="Test" onClick={() => {}} primary />
                    <Button label="Test" onClick={() => {}} />
                </Card>
                <CreateTaskModal
                    onCreate={async () => await mutate("/api/tasks")}
                />
            </SimpleGrid>
        </Flex>
    );
};

export { GridController };
