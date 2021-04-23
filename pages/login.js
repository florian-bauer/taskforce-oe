import { Button } from "@/components/button";
import { SignInWithProvider } from "@/lib/auth/provider";
import { GoogleIcon } from "@/styles/icons/GoogleIcon";
import { Flex, Image, Skeleton, useToast } from "@chakra-ui/react";
import firebase from "firebase";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Login = () => {
    // Using `useState` and `useEffect` to avoid multiple toast message
    // caused by multiple re-renders
    const [_query, setQuery] = useState({});

    const { query } = useRouter();
    const toast = useToast();

    if (query !== _query) {
        setQuery(query);
    }

    useEffect(() => {
        if (query?.allowed_organisation === "false") {
            toast({
                title: "Unauthorisierter Organisationsaccount",
                description:
                    "Dein Account muss der BCM Solutions zugeordnet sein!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, [_query]);

    const onLogin = async () =>
        await SignInWithProvider({
            provider: new firebase.auth.GoogleAuthProvider(),
        });

    return (
        <>
            <Head>
                <title>Log-In | Taskforce OE | BCM Solutions</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <Image
                    src="/Logo.png"
                    alt="BCM Solutions Logo"
                    fallback={<Skeleton width="163px" height="64px" />}
                />
                <Button
                    mt={8}
                    primary
                    label="Anmelden mit Google"
                    leftIcon={<GoogleIcon />}
                    onClick={onLogin}
                />
            </Flex>
        </>
    );
};

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
