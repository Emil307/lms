import React, { memo } from "react";
import { TextInput as MInput, TextInputProps as MTextInputProps } from "@mantine/core";
import { Search as SearchIcon, X } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";
import { useSearchStyles } from "./searchStyles";

export interface SearchProps extends MTextInputProps {
    styleVariant?: "default" | "course";
    setValue?: (value: string) => void;
}

const Search = ({ setValue = () => undefined, onChange = () => undefined, value, styleVariant = "default", ...props }: SearchProps) => {
    const { classes } = useSearchStyles({ styleVariant }, { name: "Search" });

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setValue(e.currentTarget.value);
    };

    const RightSection = () => {
        if (value) return <X size={16} color={defaultTheme.colors?.gray45?.[0]} onClick={() => setValue("")} />;
        return null;
    };

    return (
        <MInput
            {...props}
            value={value}
            icon={<SearchIcon size={16} color={defaultTheme.colors?.primary?.[0]} />}
            classNames={classes}
            rightSection={<RightSection />}
            onChange={handlerChange}
        />
    );
};

export default memo(Search);
