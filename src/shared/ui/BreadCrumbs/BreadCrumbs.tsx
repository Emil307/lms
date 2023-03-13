import { Breadcrumbs as MBreadcrumbs, Box } from "@mantine/core";
import { memo, useMemo } from "react";
import { TBreadCrumbItem } from "./types";
import useStyles from "./BreadCrumbs.styles";
import { Crumb } from "./components";

interface TBreadCrumbsProps {
    items: TBreadCrumbItem[];
}

const MemoizedBreadcrumbs = memo(function Breadcrumbs({ items }: TBreadCrumbsProps) {
    const { classes } = useStyles();

    const separator = useMemo(
        () => (
            <Box
                w={4}
                h={4}
                sx={(theme) => ({
                    backgroundColor: theme.colors.secondary,
                    borderRadius: "50%",
                })}
            />
        ),
        []
    );

    return (
        <MBreadcrumbs separator={separator} classNames={classes}>
            {items.map((item, index) => (
                <Crumb key={index} item={item} isActive={index === items.length - 1} />
            ))}
        </MBreadcrumbs>
    );
});

export default MemoizedBreadcrumbs;
