import { Button } from "@/components/button";
import { Filter } from "@/components/filter";
import { CardController } from "@/controller/card-controller";
import { CreateTaskModal } from "@/controller/create-task-modal";
import { authorizeUsersOrganization } from "@/lib/auth/provider";
import { fetcher } from "@/lib/fetcher";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
    Divider,
    Flex,
    Image,
    SimpleGrid,
    Skeleton,
    useBreakpointValue,
} from "@chakra-ui/react";
import firebase from "firebase";
import {
    AuthAction,
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
} from "next-firebase-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Children, useEffect, useState } from "react";
import useSWR from "swr";

const Index = () => {
    // Checking if the User is authenticated and
    // allowed to use the application. We check this by the
    // provided E-Mail Domain and the allowed Organisation Domain
    const { firebaseUser, getIdToken } = useAuthUser();
    // Providing the Router for redirecting to the login page
    // `next-firebase-auth` would redirect as well but we want to redirect
    // with a query parameter so we can show an error message
    const router = useRouter();
    authorizeUsersOrganization({ email: firebaseUser?.email, router });

    // We're using 1 column on the `sm` breakpoint instead of `minChildWidth`
    // That's because otherwise the Cards would stick to 400px width and overflow
    // To prevent that we're removing the `minChildWidth` prop on the `sm` breakpoint
    // So the cards stay at 1 column an resize to the width available instead of minWidth
    const SimpleGridProps = useBreakpointValue({
        base: { columns: 1 },
        sm: { minChildWidth: "400px" },
    });

    const onSignOut = async () => await firebase.auth().signOut();

    // Managing all Tasks
    const [tasks, setTasks] = useState(null);
    const { data } = useSWR("/api/tasks", (url) =>
        fetcher(url, "GET", getIdToken)
    );

    useEffect(() => {
        setTasks(data?.tasks);
    }, [data]);

    return (
        <>
            <Head>
                <title>Taskforce OE | BCM Solutions</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            {firebaseUser?.email && (
                <Flex flexDir="column">
                    <Flex
                        p={6}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Image
                            src="/Logo.png"
                            alt="BCM Solutions Logo"
                            height={[8, 12, 14]}
                            fallback={<Skeleton width="163px" height="64px" />}
                        />
                        <Button
                            label="Log Out"
                            rightIcon={<ChevronRightIcon />}
                            size="sm"
                            onClick={onSignOut}
                        />
                    </Flex>

                    <Filter
                        name="Status"
                        collection={[
                            { label: "Alle", color: "blue" },
                            { label: "Voting", color: "purple" },
                            { label: "In Arbeit", color: "orange" },
                            { label: "Abgearbeitet", color: "green" },
                        ]}
                        defaultValue="Alle"
                        p={6}
                    />

                    <Flex flexDir="column" px={6} pb={6}>
                        <Divider />
                        <SimpleGrid {...SimpleGridProps} spacing={6} mt={6}>
                            {Children.toArray(
                                tasks?.map((task) => (
                                    <CardController {...task} />
                                ))
                            )}
                            <CreateTaskModal
                                onCreate={async () => {
                                    // Refetch on Task Create
                                    const response = await fetcher(
                                        "/api/tasks",
                                        "GET",
                                        getIdToken
                                    );

                                    setTasks(response.tasks);
                                }}
                            />
                        </SimpleGrid>
                    </Flex>
                </Flex>
            )}
        </>
    );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
