import React, { memo, useMemo, useState } from "react";
import { DateRangePicker as MDateRangePicker, DateRangePickerProps as MDateRangePickerProps, DateRangePickerValue } from "@mantine/dates";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { Group, ThemeIcon, Text, useMantineTheme } from "@mantine/core";
import { z } from "zod";
import dayjs from "dayjs";
import IconCalendar from "public/icons/calendar2.svg";
import { useInputStyles } from "@shared/styles";

export interface DateRangePickerProps extends Omit<MDateRangePickerProps, "value" | "onChange"> {
    success?: string | boolean;
    value?: [string | null, string | null];
    onChange?: (value: [string | null, string | null]) => void;
}

const MemoizedDateRangePicker = memo(function DateRangePicker({ value, ...props }: DateRangePickerProps) {
    const {
        description,
        error,
        success = false,
        size,
        onChange = () => undefined,
        onFocus = () => undefined,
        onDropdownClose = () => undefined,
        onDropdownOpen = () => undefined,
    } = props;
    const theme = useMantineTheme();
    const [focused, setFocused] = useState(false);

    const onDropdownOpenHandler = () => {
        onDropdownOpen();
        setFocused(true);
    };

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus(e);
        setFocused(true);
    };

    const onDropCloseHandler = () => {
        onDropdownClose();
        setFocused(false);
    };

    const handleChange = (value: DateRangePickerValue) => {
        const from = value[0] ? dayjs(value[0]).format() : null;
        const to = value[1] ? dayjs(value[1]).format() : null;
        onChange([from, to]);
        setFocused(false);
    };

    const statusSuccess = !!value?.[0] && !error && !!success;

    const { classes } = useInputStyles({
        floating: !!value?.[0] || focused,
        size: size,
        statusSuccess,
    });

    const renderError = useMemo(
        () =>
            error && (
                <>
                    <AlertTriangle />
                    <Text>{error}</Text>
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

    const getValues = (): DateRangePickerValue => [value?.[0] ? new Date(value[0]) : null, value?.[1] ? new Date(value[1]) : null];

    return (
        <MDateRangePicker
            {...props}
            value={getValues()}
            hideWeekdays={false}
            classNames={classes}
            onChange={handleChange}
            onDropdownOpen={onDropdownOpenHandler}
            onFocus={onFocusHandler}
            onDropdownClose={onDropCloseHandler}
            rightSection={
                <ThemeIcon
                    variant="outline"
                    sx={(theme) => ({
                        border: "none",
                        "svg path": {
                            fill: theme.colors.gray45[0],
                            fillOpacity: 1,
                        },
                    })}>
                    <IconCalendar />
                </ThemeIcon>
            }
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
});

export default MemoizedDateRangePicker;
