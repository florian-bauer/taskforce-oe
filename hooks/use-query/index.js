import { useRouter } from "next/router";

/**
 * Workaround for getting the URL Query Parameters inside a useEffect function
 * NextJS has currently an issue that the Query Parameters aren't resolved on the component mount event
 */
const useQuery = () => {
    const router = useRouter();
    const hasQueryParams =
        /\[.+\]/.test(router.route) || /\?./.test(router.asPath);
    const ready = !hasQueryParams || Object.keys(router.query).length > 0;
    if (!ready) return null;
    return router.query;
};

export { useQuery };
