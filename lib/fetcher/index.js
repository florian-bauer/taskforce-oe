const fetcher = async (url, method, getIdToken) => {
    const token = await getIdToken();

    const response = await fetch(url, {
        method,
        headers: {
            authorization: token,
        },
    });

    const data = await response.json();
    return data;
};

export { fetcher };
