import React, { memo, useState } from "react";
import { MultiSelect as MMultiSelect, MultiSelectProps as MMultiSelectProps } from "@mantine/core";
import { ChevronDown, X } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";
import { useMultiSelectStyles } from "./MultiSelectStyles";

export interface MultiSelectProps extends MMultiSelectProps {}

const MultiSelect = ({ onChange = () => undefined, onFocus = () => undefined, onBlur = () => undefined, ...props }: MultiSelectProps) => {
    const [focused, setFocused] = useState(false);
    const { classes } = useMultiSelectStyles({ isValue: focused || (!!props.value && props.value.length > 0) });

    const handlerClear = () => {
        onChange([]);
    };

    const RightSection = () => {
        if (props.rightSection) {
            return <>{props.rightSection}</>;
        }
        if (!!props.value && props.value.length > 0) {
            return <X color={defaultTheme.colors?.gray45?.[0]} onClick={handlerClear} />;
        }
        return <ChevronDown style={{ pointerEvents: "none" }} color={defaultTheme.colors?.gray45?.[0]} />;
    };

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus(e);
        setFocused(true);
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur(e);
        setFocused(false);
    };

    const handlerOnChange = (value: string[]) => {
        onChange(value);
        setFocused(false);
    };
    return (
        <MMultiSelect
            {...props}
            classNames={classes}
            onChange={handlerOnChange}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            rightSection={<RightSection />}
        />
    );
};

export default memo(MultiSelect);
