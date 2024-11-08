import React from "react";
import { Flex, Box } from "@mantine/core";
import { Button, Heading } from "@shared/ui";
import useStyles from "./Fallback.styles";

interface IFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

export const Fallback: React.FC<IFallbackProps> = ({ error, resetErrorBoundary }) => {
    const { classes } = useStyles();
    return (
        <Flex direction="column" align="center" gap={48}>
            <Box className={classes.imageWrapper}></Box>
            <Flex direction="column" gap={16}>
                <Heading align="center">{error.message}</Heading>
            </Flex>
            <Button onClick={resetErrorBoundary} variant="primary">
                Попробовать снова
            </Button>
        </Flex>
    );
};
