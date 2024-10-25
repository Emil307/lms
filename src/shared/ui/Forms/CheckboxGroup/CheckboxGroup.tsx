import React, { memo, useMemo } from "react";
import { CheckboxGroupProps as MCheckboxGroupProps, Checkbox as MCheckbox, Flex, ThemeIcon } from "@mantine/core";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { z } from "zod";
import { Paragraph } from "@shared/ui";
import useStyles from "./CheckboxGroup.styles";

export interface CheckboxGroupProps extends MCheckboxGroupProps {
    success?: string;
}

const MemoizedCheckboxGroup = memo(function CheckboxGroup({ children, error, success, description, ...props }: CheckboxGroupProps) {
    const { classes } = useStyles();
    const statusSuccess = useMemo(() => !!props.value?.length && !error && !!success, [props.value, error, success]);

    const renderError = () =>
        error && (
            <>
                <AlertTriangle />
                <Paragraph variant="text-smaller">{error}</Paragraph>
            </>
        );

    const renderDescription = () => {
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
    };

    return (
        <MCheckbox.Group
            {...props}
            classNames={classes}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError()}
            description={renderDescription()}>
            {children}
        </MCheckbox.Group>
    );
});

export default MemoizedCheckboxGroup;
