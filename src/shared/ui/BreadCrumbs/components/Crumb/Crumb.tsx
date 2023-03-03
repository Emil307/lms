import Link from "next/link";
import { memo } from "react";
import useStyles from "./Crumb.styles";
import { TBreadCrumbItem } from "../../types";

export interface CrumbProps {
    item: TBreadCrumbItem;
    isActive: boolean;
}

const MemoizedCrumb = memo(function Crumb({ item, isActive }: CrumbProps) {
    const { classes } = useStyles({ isActiveCrumb: isActive });

    return (
        <Link className={classes.crumb} href={item.href}>
            {item.title}
        </Link>
    );
});

export default MemoizedCrumb;
