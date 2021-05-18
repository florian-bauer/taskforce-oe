const getBadgeColor = ({ role }) => (role === "admin" ? "red" : "blue");

const filter = (searchTerm, list) => {
    const compare = (value) => {
        return value
            .trim()
            .toUpperCase()
            .includes(searchTerm.trim().toUpperCase());
    };

    return list.filter(({ name, email, role }) => {
        return compare(name) || compare(email) || compare(role);
    });
};

const getUsers = async () => {
    const response = await fetch("/api/user");
    const users = await response.json();
    return { users };
};

export { getBadgeColor, filter, getUsers };
