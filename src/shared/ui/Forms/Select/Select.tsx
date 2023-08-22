import React, { Ref, memo, useCallback, useMemo, useRef, useState } from "react";
import { Flex, Select as MSelect, SelectProps as MSelectProps, SelectItem as ISelectItem, ThemeIcon } from "@mantine/core";
import { AlertTriangle, CheckCircle, ChevronDown, Info, Search, X } from "react-feather";
import { z } from "zod";
import { useInputStyles } from "@shared/styles";
import { Paragraph } from "@shared/ui";
import { SelectItem } from "./components";

export interface SelectProps extends Omit<MSelectProps, "data"> {
    data: ISelectItem[];
    success?: string | boolean;
    variantSearhableSelect?: "searchable" | "default";
    lastElementRef?: Ref<HTMLDivElement>;
}

const MemoizedSelect = (props: SelectProps) => {
    const {
        icon,
        size = "md",
        searchable,
        variantSearhableSelect = "searchable",
        onChange = () => undefined,
        onFocus = () => undefined,
        onBlur = () => undefined,
        classNames,
        styles,
        unstyled,
        description,
        error,
        success = false,
        lastElementRef,
    } = props;

    const ref = useRef<HTMLInputElement | null>(null);
    const [focused, setFocused] = useState(false);
    const [openedDropdown, setOpenedDropdown] = useState(props.initiallyOpened);

    const statusSuccess = useMemo(() => !!props.value && !error && !!success, [props.value, error, success]);
    const { classes } = useInputStyles(
        {
            floating: props.value?.toString().trim().length !== 0 || focused,
            rightSection: true,
            icon: icon || (variantSearhableSelect === "searchable" && searchable),
            size: size,
            isActive: props.data.find((option) => option.value === props.value)?.isActive,
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

    const handlerOnChange = (value: string | null) => {
        setFocused(false);
        if (!value) {
            onChange("");
            return;
        }
        onChange(value);
    };

    const handleDropdownOpen = () => {
        setOpenedDropdown(true);
    };

    const handleDropdownClose = () => {
        setOpenedDropdown(false);
    };

    const RightSection = () => {
        if (props.rightSection) {
            return <>{props.rightSection}</>;
        }
        if (props.value && props.clearable) {
            return (
                <ThemeIcon color="gray45" w={16} h={16} sx={{ pointerEvents: props.disabled ? "none" : "initial" }} onClick={handlerClear}>
                    <X />
                </ThemeIcon>
            );
        }
        return (
            <ThemeIcon color="gray45" sx={{ transform: `rotate(${openedDropdown ? 180 : 0}deg)` }}>
                <ChevronDown />
            </ThemeIcon>
        );
    };

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

    const renderIcon = () => {
        if (variantSearhableSelect === "searchable" && searchable) {
            return (
                <ThemeIcon color="primary">
                    <Search />
                </ThemeIcon>
            );
        }
        return icon;
    };

    const renderComponent = useCallback(
        (props: any) => props.itemComponent ?? <SelectItem {...props} ref={lastElementRef} />,
        [props.itemComponent, lastElementRef]
    );

    return (
        <MSelect
            {...props}
            ref={ref}
            onChange={handlerOnChange}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            icon={renderIcon()}
            classNames={classes}
            itemComponent={renderComponent}
            rightSection={<RightSection />}
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
        />
    );
};

export default memo(MemoizedSelect);
