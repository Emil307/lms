import React, { memo } from "react";
import { TextInput as MInput } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { Search as SearchIcon } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";

export interface SearchProps extends React.ComponentProps<typeof MInput> {
    styleVariant?: "default" | "course";
}

const useStyles = createStyles((theme) => ({
    root: {},
}));

const Search = (props: SearchProps) => {
    console.log(!!0)
    const { classes, cx } = useStyles(undefined, { name: "Search" });
    return <MInput icon={<SearchIcon size={16} color={defaultTheme.colors?.primary?.[0]} />} {...props} className={cx(classes.root)} />;
};

export default memo(Search);
