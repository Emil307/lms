import Link from "next/link";
import { memo } from "react";
import { Paragraph, TBreadCrumbItem } from "@shared/ui";
import useStyles from "./Crumb.styles";

export interface CrumbProps {
    item: TBreadCrumbItem;
    isActive: boolean;
}

const MemoizedCrumb = memo(function Crumb({ item, isActive }: CrumbProps) {
    const { classes } = useStyles({ isActiveCrumb: isActive });

    if (!item.href) {
        return (
            <Paragraph variant="text-small-m" maw={item.maxWidth} className={classes.content}>
                {item.title}
            </Paragraph>
        );
    }

    return (
        <Link className={classes.crumb} href={item.href}>
            <Paragraph variant="text-small-m" maw={item.maxWidth} className={classes.content}>
                {item.title}
            </Paragraph>
        </Link>
    );
});

export default MemoizedCrumb;
