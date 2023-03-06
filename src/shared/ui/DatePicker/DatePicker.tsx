import React, { useState } from "react";
import { DatePicker as MDatePicker, DatePickerProps as MDatePickerProps } from "@mantine/dates";
import { Calendar } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";
import { useInputStyles } from "@shared/styles/InputStyles";

export interface DatePickerProps extends MDatePickerProps {}

export const DatePicker = (props: DatePickerProps) => {
    const {
        size,
        onChange = () => undefined,
        onFocus = () => undefined,
        onDropdownClose = () => undefined,
        onDropdownOpen = () => undefined,
    } = props;
    const [focused, setFocused] = useState(false);

    const onDropdownOpenHandler = () => {
        onDropdownOpen();
        setFocused(true)
    }

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus(e);
        setFocused(true);
    };

    const onDropCloseHandler = () => {
        onDropdownClose();
        setFocused(false);
    };

    const handlerOnChange = (value: Date | null) => {
        onChange(value);
        setFocused(false);
    };

    const { classes } = useInputStyles({
        floating: !!props.value || focused,
        size: size,
    });

    return (
        <MDatePicker
            {...props}
            classNames={classes}
            onChange={handlerOnChange}
            onDropdownOpen={onDropdownOpenHandler}
            onFocus={onFocusHandler}
            onDropdownClose={onDropCloseHandler}
            rightSection={<Calendar color={defaultTheme.colors?.gray45?.[0]} />}
        />
    );
};
