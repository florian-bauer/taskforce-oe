import { HStack, useBreakpointValue, VStack } from "@chakra-ui/react";

const Wrapper = (props) => {
    const useVerticalStack = useBreakpointValue({ base: true, sm: false });
    let Wrapper = (props) => <HStack width="100%" {...props} />;

    if (useVerticalStack)
        Wrapper = (props) => <VStack width="100%" {...props} />;

    return <Wrapper {...props} />;
};

export { Wrapper };
