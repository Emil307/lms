import React, { useMemo } from "react";
import { Flex, Textarea as MTextarea, TextareaProps as MTextareaProps, ThemeIcon } from "@mantine/core";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { z } from "zod";
import { Paragraph } from "@shared/ui";
import { useTextareaStyles } from "./Textarea.styles";

export interface TextareaProps extends MTextareaProps {
    success?: string | boolean;
}

const Textarea = ({ success, error, description, ...props }: TextareaProps) => {
    const { classes } = useTextareaStyles();

    const renderError = error && (
        <>
            <AlertTriangle />
            <Paragraph variant="text-smaller">{error}</Paragraph>
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
                    <Flex gap={16}>
                        <ThemeIcon color="secondary">
                            <CheckCircle />
                        </ThemeIcon>
                        <Paragraph variant="text-smaller">{success}</Paragraph>
                    </Flex>
                )}
                {description && (
                    <Flex gap={16}>
                        <ThemeIcon color="primaryHover">
                            <Info />
                        </ThemeIcon>
                        <Paragraph variant="text-smaller">{description}</Paragraph>
                    </Flex>
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
