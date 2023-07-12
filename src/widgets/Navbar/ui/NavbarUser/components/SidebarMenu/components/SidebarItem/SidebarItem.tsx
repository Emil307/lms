import { memo, useContext } from "react";
import { useRouter } from "next/router";
import { Box } from "@mantine/core";
import { Button } from "@shared/ui";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import useStyles from "./SidebarItem.styles";
import { SidebarItemData } from "../../types";

export interface SidebarItemProps {
    data: SidebarItemData;
}

const MemoizedSidebarItem = memo(function SidebarItem({ data }: SidebarItemProps) {
    const router = useRouter();
    const isActive = router.pathname === data.isCheckRoute;
    const { classes } = useStyles({ isActive });

    const { setOpenedSidebar } = useContext(SidebarMenuContext);

    const handleClick = () => {
        router.push(data.href);
        setOpenedSidebar(false);
    };

    return (
        <Box>
            <Button variant="white" leftIcon={data.icon} size="small" onClick={handleClick} className={classes.root}>
                {data.label}
            </Button>
        </Box>
    );
});

export default MemoizedSidebarItem;
