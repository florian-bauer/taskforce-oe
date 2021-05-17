import { IndexPageController } from "@/controller/index-page-controller";
import {
    AuthAction,
    withAuthUser,
    withAuthUserTokenSSR,
} from "next-firebase-auth";
import Head from "next/head";

const Index = () => (
    <>
        <Head>
            <title>Taskforce OE | BCM Solutions</title>
            <link rel="icon" href="/favicon.png" />
        </Head>

        <IndexPageController />
    </>
);

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
