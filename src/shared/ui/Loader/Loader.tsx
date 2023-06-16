import { Loader as MLoader, LoaderProps as MLoaderProps, Flex } from "@mantine/core";

const Loader = (props: MLoaderProps) => {
    return (
        <Flex justify="center">
            <MLoader {...props} />
        </Flex>
    );
};

export default Loader;
