const setRole = async ({ token, uid, administrator }) => {
    if (!token) return;

    const response = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
            authorization: token,
        },
        body: JSON.stringify({ uid, administrator }),
    });

    const data = await response.json();
    return { data };
};

export { setRole };
