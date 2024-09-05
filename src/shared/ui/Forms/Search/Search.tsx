import React, { memo } from "react";
import { TextInput as MInput, TextInputProps as MTextInputProps, ThemeIcon } from "@mantine/core";
import { Search as SearchIcon, X } from "react-feather";
import { useSearchStyles } from "./Search.styles";

export interface SearchProps extends MTextInputProps {
    styleVariant?: "default" | "course";
    setValue?: (value: string) => void;
    iconSize?: number;
}

const RightSection = ({ value, setValue }: { value?: string | number | readonly string[]; setValue: (value: string) => void }) => {
    if (value) {
        return (
            <ThemeIcon color="gray45" w={16} h={16} onClick={() => setValue("")}>
                <X />
            </ThemeIcon>
        );
    }
    return null;
};

const Search = ({
    setValue = () => undefined,
    onChange = () => undefined,
    value,
    styleVariant = "default",
    iconSize,
    ...props
}: SearchProps) => {
    const { classes } = useSearchStyles({ styleVariant }, { name: "Search" });

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setValue(e.currentTarget.value);
    };

    return (
        <MInput
            {...props}
            value={value}
            icon={
                <ThemeIcon color="primary" w={iconSize || 16} h={iconSize || 16}>
                    <SearchIcon />
                </ThemeIcon>
            }
            classNames={classes}
            rightSection={<RightSection value={value} setValue={setValue} />}
            onChange={handlerChange}
        />
    );
};

export default memo(Search);
