const useOptions = (definite, options) => {
    const { be } = options.find(({ is, be }) => definite === is);
    return be;
};

export { useOptions };
