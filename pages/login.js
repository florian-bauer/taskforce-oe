import { Button } from "@/components/button";
import { SignInWithProvider } from "@/lib/auth/provider";
import { GoogleIcon } from "@/styles/icons/GoogleIcon";
import { Flex, Image, Skeleton } from "@chakra-ui/react";
import firebase from "firebase";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Head from "next/head";

const Login = () => {
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
