const useBoolean = (boolean = true) => ({
    useFlag: (optionA, optionB) => (boolean ? optionA : optionB),
});

export { useBoolean };
