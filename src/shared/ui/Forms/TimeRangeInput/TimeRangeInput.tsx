import React, { memo, useCallback, useMemo, useState } from "react";
import { TimeRangeInput as MTimeRangeInput, TimeRangeInputProps as MTimeRangeInputProps } from "@mantine/dates";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { Flex, ThemeIcon } from "@mantine/core";
import { z } from "zod";
import dayjs from "dayjs";
import { useInputStyles } from "@shared/styles";
import { Paragraph } from "@shared/ui";

export type TimeRangeInputValue = [Date | null, Date | null];

export interface TimeRangeInputProps extends Omit<MTimeRangeInputProps, "value" | "onChange"> {
    success?: string | boolean;
    value?: [string | null, string | null];
    onChange?: (value: [string | null, string | null]) => void;
}

const MemoizedTimeRangeInput = memo(function TimeRangeInput({ value, ...props }: TimeRangeInputProps) {
    const { description, error, success = false, size, onChange = () => undefined } = props;
    const [focused, setFocused] = useState(false);

    const handleChange = useCallback((value: TimeRangeInputValue) => {
        const from = value[0] ? dayjs(value[0]).format() : null;
        const to = value[1] ? dayjs(value[1]).format() : null;
        onChange([from, to]);
    }, []);

    const statusSuccess = useMemo(() => !!value?.[0] && !error && !!success, [value, error, success]);

    const { classes } = useInputStyles({
        floating: !!value?.[0] || !!value?.[1] || focused,
        size: size,
        statusSuccess,
    });

    const renderError = useMemo(
        () =>
            error && (
                <>
                    <AlertTriangle />
                    <Paragraph variant="text-smaller">{error}</Paragraph>
                </>
            ),
        [error]
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

    const getValues: TimeRangeInputValue = useMemo(
        () => [value?.[0] ? new Date(value[0]) : null, value?.[1] ? new Date(value[1]) : null],
        [value]
    );
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    return (
        <MTimeRangeInput
            {...props}
            value={getValues}
            classNames={classes}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
});

export default MemoizedTimeRangeInput;
