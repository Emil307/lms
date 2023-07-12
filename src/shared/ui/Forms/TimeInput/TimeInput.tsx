import React, { memo, useMemo, useState } from "react";
import { TimeInput as MTimeInput, TimeInputProps as MTimeInputProps } from "@mantine/dates";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { Flex, ThemeIcon } from "@mantine/core";
import { z } from "zod";
import { useInputStyles } from "@shared/styles";
import { Paragraph } from "@shared/ui/Typography";

export interface TimeInputProps extends MTimeInputProps {
    success?: string | boolean;
}

const MemoizedTimeRangeInput = memo(function TimeRangeInput({ value, ...props }: TimeInputProps) {
    const { description, error, success = false, size, onChange = () => undefined } = props;

    const [focused, setFocused] = useState(false);

    const statusSuccess = !!value && !error && !!success;

    const { classes } = useInputStyles({
        floating: !!value || focused,
        size: size,
        statusSuccess,
    });

    const renderError = error && (
        <>
            <AlertTriangle />
            <Paragraph variant="text-smaller">{error}</Paragraph>
        </>
    );

    const renderDescription = useMemo(() => {
        if (!description && !(success && statusSuccess)) {
            return;
        }

        return (
            <>
                {statusSuccess && !z.boolean().safeParse(success).success && (
                    <Flex gap={16}>
                        <ThemeIcon color="done">
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

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    return (
        <MTimeInput
            {...props}
            value={value}
            classNames={classes}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
});

export default MemoizedTimeRangeInput;
