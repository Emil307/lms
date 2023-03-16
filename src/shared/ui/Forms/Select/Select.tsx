import React, { memo, useState } from "react";
import { Select as MSelect } from "@mantine/core";
import { ChevronDown, Search, X } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";
import { useInputStyles } from "@shared/styles";
import { SelectItem } from "./SelectItem";

export interface SelectProps extends React.ComponentProps<typeof MSelect> {}

const MemoizedSelect = (props: SelectProps) => {
    const {
        icon,
        size = "md",
        searchable,
        clearable,
        onChange = () => undefined,
        onFocus = () => undefined,
        onBlur = () => undefined,
        classNames,
        styles,
        unstyled,
    } = props;

    const [focused, setFocused] = useState(false);
    const { classes } = useInputStyles(
        {
            floating: props.value?.toString().trim().length !== 0 || focused,
            icon: icon || searchable,
            size: size,
            clearable: clearable && props.value?.toString().trim().length !== 0,
        },
        { name: "Select", classNames, styles, unstyled }
    );

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onFocus(e);
        setFocused(true);
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        onBlur(e);
        setFocused(false);
    };

    const handlerClear = () => {
        onChange("");
    };

    const handlerOnChange = (value: string) => {
        onChange(value);
        setFocused(false);
    };

    const RightSection = () => {
        if (props.rightSection) {
            return <>{props.rightSection}</>;
        }
        if (props.value && props.clearable) {
            return <X color={defaultTheme.colors?.gray45?.[0]} onClick={handlerClear} />;
        }
        return <ChevronDown style={{ pointerEvents: "none" }} color={defaultTheme.colors?.gray45?.[0]} />;
    };

    return (
        <MSelect
            {...props}
            onChange={handlerOnChange}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            icon={searchable ? <Search color={defaultTheme.colors?.primary?.[0]} /> : icon}
            classNames={classes}
            itemComponent={props.itemComponent ?? SelectItem}
            rightSection={<RightSection />}
        />
    );
};

export default memo(MemoizedSelect);
