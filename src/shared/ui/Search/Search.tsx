import React, { memo } from "react";
import { TextInput as MInput } from "@mantine/core";
import { Search as SearchIcon, X } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";
import { useSearchStyles } from "./searchStyles";

export interface SearchProps extends React.ComponentProps<typeof MInput> {
    styleVariant?: "default" | "course";
    setValue: (value: string) => void;
}

const Search = ({ setValue, value, styleVariant = "default", ...props }: SearchProps) => {
    const { classes } = useSearchStyles({ styleVariant }, { name: "Search" });

    const handlerChange = (currentValue: string) => {
        setValue(currentValue);
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
            onChange={(e) => handlerChange(e.currentTarget.value)}
        />
    );
};

export default memo(Search);
