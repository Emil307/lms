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

const RightSection = ({
    rightSection,
    value,
    clearable,
    handlerClear,
    disabled,
    openedDropdown,
}: {
    rightSection: React.ReactNode;
    value?: string | null;
    clearable: boolean | undefined;
    handlerClear: () => void;
    disabled: boolean | undefined;
    openedDropdown?: boolean;
}) => {
    if (rightSection) {
        return <>{rightSection}</>;
    }
    if (value && clearable) {
        return (
            <ThemeIcon color="neutralMain50" w={16} h={16} sx={{ pointerEvents: disabled ? "none" : "initial" }} onClick={handlerClear}>
                <X />
            </ThemeIcon>
        );
    }
    return (
        <ThemeIcon color="neutralMain50" sx={{ transform: `rotate(${openedDropdown ? 180 : 0}deg)` }}>
            <ChevronDown />
        </ThemeIcon>
    );
};

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
        { name: "Select", classNames, styles, unstyled },
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
        [props.itemComponent, lastElementRef],
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
            rightSection={
                <RightSection
                    rightSection={props.rightSection}
                    value={props.value}
                    clearable={props.clearable}
                    handlerClear={handlerClear}
                    disabled={props.disabled}
                    openedDropdown={openedDropdown}
                />
            }
            inputWrapperOrder={["label", "input", "error", "description"]}
            error={renderError}
            description={renderDescription}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
        />
    );
};

export default memo(MemoizedSelect);
