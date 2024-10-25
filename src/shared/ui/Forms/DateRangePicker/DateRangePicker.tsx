import React, { memo, useMemo, useState } from "react";
import { DateRangePicker as MDateRangePicker, DateRangePickerProps as MDateRangePickerProps, DateRangePickerValue } from "@mantine/dates";
import { AlertTriangle, CheckCircle, Info } from "react-feather";
import { ThemeIcon, Flex } from "@mantine/core";
import { z } from "zod";
import IconCalendar from "public/icons/calendar2.svg";
import { useInputStyles } from "@shared/styles";
import { Paragraph } from "@shared/ui";

export interface DateRangePickerProps extends MDateRangePickerProps {
    success?: string | boolean;
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
        onChange([value[0], value[1]]);
        setFocused(false);
    };

    const statusSuccess = !!value?.[0] && !error && !!success;

    const rightSection = (
        <ThemeIcon
            sx={(theme) => ({
                "svg path": {
                    fill: theme.colors.neutralMain50[0],
                    fillOpacity: 1,
                },
            })}>
            <IconCalendar />
        </ThemeIcon>
    );

    const { classes } = useInputStyles({
        floating: !!value?.[0] || focused,
        rightSection: rightSection,
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
        [error],
    );

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
        <MDateRangePicker
            {...props}
            value={value}
            hideWeekdays={false}
            classNames={classes}
            onChange={handleChange}
            onDropdownOpen={onDropdownOpenHandler}
            onFocus={onFocusHandler}
            onDropdownClose={onDropCloseHandler}
            rightSection={rightSection}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
        />
    );
});

export default MemoizedDateRangePicker;
