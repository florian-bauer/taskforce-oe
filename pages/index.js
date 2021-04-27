import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { CardButton } from "@/components/card-button";
import { Filter } from "@/components/filter";
import { FINISHED, PROGRESS, VOTING } from "@/constants/status";
import { AuthorizeUsersOrganisation } from "@/lib/auth/provider";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
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

const args = {
    title: "Kaffeekasse für alle Mitarbeiter",
    description:
        "Alle kennen es, man will kostenlosen Kaffee haben. Ich bin dafür dass dies nun von allen Kaffeetrinkern in angriff genommen wird. Hierfür würde alle Kaffeetrinker in eine kleine Kasse einzahlen.",
    name: "Florian Bauer",
    avatar:
        "https://lh3.googleusercontent.com/fife/ABSRlIr_zeJVYKD3OpUctp8FcT8Mf3t2EH2UXCEHvXYwk6u8k-_L_EbIc8hH_symaKI0TdIVq1z18ujRvGoTLcWotlXYxHi4l81lS9FrjhZkOUhClCiwNw0hdYCM6LlEL3KuQc1xH7Vg1YejrNWpsB4liVKjmDR6D-QvnXGDj9Ba_c0C6VJK4POrqibkAkZMclQ3rDxDL1SLLkQaYrw7VSoTFtTwvi7bHJLR0hQSp0iBPcpeAKsN0gNz0SljGBpxff3j7X449GLqBop7FC67pMgDgtJj-Y6evFweKUNhVC71bnijxvnj_1Uk10raxGwGBx5wATXTMZQcHd2LKqE8jBBKEUBSQtrmVvRtkChrybUFXUUgOdeJCdHwvUyh29uKo7AEipUiFqlZu_t0u0t5HfvanYFhyIElyuc1rbfMXpLPw5MKu70EKG3NqO9Ven6Vmy58i1SynpRPqNHaoJtWlTBovcAkZ5ryAnJPDVVIZNwRE20DGLuXS4IQCPIj8oeb6SiwHp_FeNb0YH6DbjEUUPN119MvZ3gzntMavqGG2Jfq7UtgSIznIMtiy0dy_F5ORQ2rOnL3OHfJhc2XKmp-TM-dM0VD4WWDJiNGhDb07j2I8QHKKUL70IfF5AqsYg8d_rQs6bhMD0KdtDNadPBwcfVyIARYfQ_UFUXX6HvmWUD5Tm9nblzSV5dU2mdsldPi7nQmDph8LTtd6WGODD6vi9n5YvSBW1RDQoQEygRBdxJrePtJk9M=s83-c",
    participants: [
        {
            name: "Ki-Adi Mundi",
            avatar: "",
        },
        {
            name: "Anakin Skywalker",
            avatar: "",
        },
        {
            name: "Mace Windu",
            avatar: "",
        },
    ],
    is: {
        owner: false,
        administrator: false,
    },
};

const Index = () => {
    // Checking if the User is authenticated and
    // allowed to use the application. We check this by the
    // provided E-Mail Domain and the allowed Organisation Domain
    const { firebaseUser } = useAuthUser();
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

    // Don't render content until the users email is received
    if (!firebaseUser?.email) return <></>;

    return (
        <>
            <Head>
                <title>Taskforce OE | BCM Solutions</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Flex flexDir="column">
                <Flex p={6} alignItems="center" justifyContent="space-between">
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
                        <Card {...args} status={VOTING} />
                        <Card {...args} status={PROGRESS} />
                        <Card {...args} status={VOTING} />
                        <Card {...args} status={FINISHED} />
                        <Card {...args} status={VOTING} />
                        <CardButton
                            label="Vorschlag erstellen"
                            icon={<AddIcon />}
                        />
                    </SimpleGrid>
                </Flex>
            </Flex>
        </>
    );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
