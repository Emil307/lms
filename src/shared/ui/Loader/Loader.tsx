import { Loader as MLoader, LoaderProps as MLoaderProps, Flex, LoadingOverlay } from "@mantine/core";
import React from "react";
import useStyles from "./Loader.styles";

interface LoaderProps extends MLoaderProps {
    isLoading?: boolean;
    overlay?: boolean;
}

const Loader = ({ overlay = false, isLoading = true, ...props }: LoaderProps) => {
    const { classes } = useStyles();

    if (overlay) {
        return <LoadingOverlay visible={isLoading} overlayBlur={2} className={classes.overlay} />;
    }

    return (
        <Flex justify="center">
            <MLoader {...props} color="dark" />
        </Flex>
    );
};

export default Loader;
