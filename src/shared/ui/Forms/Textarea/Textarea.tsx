import React, { useMemo } from "react";
import { Group, Textarea as MTextarea, TextareaProps as MTextareaProps, Text, useMantineTheme } from "@mantine/core";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { z } from "zod";
import { useTextareaStyles } from "./Textarea.styles";

export interface TextareaProps extends MTextareaProps {
    success?: string | boolean;
}

const Textarea = ({ success, error, description, ...props }: TextareaProps) => {
    const { classes } = useTextareaStyles();
    const theme = useMantineTheme();

    const renderError = error && (
        <>
            <AlertTriangle />
            <Text>{error}</Text>
        </>
    );

    const statusSuccess = !!props.value && !error && !!success;

    const renderDescription = useMemo(() => {
        if (!description && !(success && statusSuccess)) {
            return;
        }

        return (
            <>
                {statusSuccess && !z.boolean().safeParse(success).success && (
                    <Group>
                        <CheckCircle color={theme.colors.done[0]} />
                        <Text>{success}</Text>
                    </Group>
                )}
                {description && (
                    <Group>
                        <Info color={theme.colors.primaryHover[0]} />
                        <Text>{description}</Text>
                    </Group>
                )}
            </>
        );
    }, [statusSuccess, success, description]);

    return (
        <MTextarea
            {...props}
            classNames={classes}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
};

export default Textarea;
