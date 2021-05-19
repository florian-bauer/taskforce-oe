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

export { getBadgeColor, filter };
