import { Button } from "@/components/button";
import { Filter } from "@/components/filter";
import { CardController } from "@/controller/card-controller";
import { CreateTaskModal } from "@/controller/create-task-modal";
import { AuthorizeUsersOrganisation } from "@/lib/auth/provider";
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
import { useState, Children } from "react";

const Index = () => {
    // Checking if the User is authenticated and
    // allowed to use the application. We check this by the
    // provided E-Mail Domain and the allowed Organisation Domain
    const { firebaseUser, getIdToken } = useAuthUser();
    // Providing the Router for redirecting to the login page
    // `next-firebase-auth` would redirect as well but we want to redirect
    // with a query parameter so we can show an error message
    const router = useRouter();
    AuthorizeUsersOrganisation({ email: firebaseUser?.email, router });

    // We're using 1 column on the `sm` breakpoint instead of `minChildWidth`
    // That's because otherwise the Cards would stick to 400px width and overflow
    // To prevent that we're removing the `minChildWidth` prop on the `sm` breakpoint
    // So the cards stay at 1 column an resize to the width available instead of minWidth
    const SimpleGridProps = useBreakpointValue({
        base: { columns: 1 },
        sm: { minChildWidth: "400px" },
    });

    const onSignOut = async () => await firebase.auth().signOut();

    // Fetching all Tasks and storing them into the State once they're fetched
    const [tasks, setTasks] = useState(null);

    const getTasks = async () => {
        const token = await getIdToken();
        if (!token) return;

        // TODO(developer): Replace `http://localhost:3000` with dynamic host
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "GET",
            headers: {
                authorization: token,
            },
        });

        const data = await response.json();
        if (!data) return;
        setTasks(data.tasks);
    };

    if (!tasks) {
        getTasks();
    }

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
                            <CreateTaskModal />
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
