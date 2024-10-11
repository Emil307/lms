import React, { memo } from "react";
import { TextInput as MInput, TextInputProps as MTextInputProps, ThemeIcon } from "@mantine/core";
import { Search as SearchIcon, X } from "react-feather";
import { useSearchStyles } from "./Search.styles";

export type SearchSize = "large" | "medium";
export interface SearchProps
    extends Omit<MTextInputProps, "size" | "variant">,
        Omit<React.ComponentPropsWithoutRef<"input">, keyof MTextInputProps> {
    setValue?: (value: string) => void;
    onClear?: () => void;
    size?: SearchSize;
}

const XIcon = () => (
    <ThemeIcon color="gray45" w={16} h={16} mr={16}>
        <X />
    </ThemeIcon>
);

const Search = ({
    setValue = () => undefined,
    onChange = () => undefined,
    onClear = () => undefined,
    value,
    size = "medium",
    ...props
}: SearchProps) => {
    const { classes } = useSearchStyles({ size }, { name: "Search" });

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setValue(e.currentTarget.value);
    };
    const handleClear = () => {
        setValue("");
        onClear();
    };

    return (
        <MInput
            {...props}
            value={value}
            icon={
                <ThemeIcon color="primary">
                    <SearchIcon />
                </ThemeIcon>
            }
            classNames={classes}
            rightSection={value ? <XIcon /> : null}
            rightSectionProps={{ onClick: handleClear }}
            onChange={handlerChange}
        />
    );
};

export default memo(Search);
