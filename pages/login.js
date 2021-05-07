import { LoginPageController } from "@/controller/login-page-controller";
import { Flex, Image, Skeleton } from "@chakra-ui/react";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Head from "next/head";

const Login = () => (
    <>
        <Head>
            <title>Log-In | Taskforce OE | BCM Solutions</title>
            <link rel="icon" href="/favicon.png" />
        </Head>

        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            h="100%"
        >
            <Image
                src="/Logo.png"
                alt="BCM Solutions Logo"
                fallback={<Skeleton width="163px" height="64px" />}
            />

            <LoginPageController />
        </Flex>
    </>
);

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
