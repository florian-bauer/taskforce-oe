import { Button } from "@/components/button";
import { GoogleIcon } from "@/styles/icons/GoogleIcon";
import { Image, Skeleton, Flex } from "@chakra-ui/react";
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
            />
        </Flex>
    </>
);

export default Login;
