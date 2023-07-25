import React, { ForwardedRef, ReactNode, forwardRef, useContext } from "react";
import { useRouter } from "next/router";
import { ThemeIcon, Text, Flex, FlexProps, Box } from "@mantine/core";
import { LinkProps } from "next/link";
import IndicatorIcon from "@public/icons/indicator.svg";
import { Tooltip } from "@shared/ui";
import { AdminSidebarMenuContext } from "@app/layouts/AdminLayout/utils";
import { useSession } from "@features/auth";
import { isMenuItemDenied } from "@widgets/Navbar/utils";
import useStyles from "./SidebarItemStyles";

export interface SidebarItemProps extends Omit<FlexProps, "children"> {
    icon?: ReactNode;
    label: string;
    isActive?: boolean;
    href?: LinkProps["href"];
    inner?: boolean;
    roles?: number[];
    isOpenInnerContent?: boolean;
}

const SidebarItem = forwardRef(function SidebarItem(
    { icon, label, isActive = false, href, inner = false, roles = [], isOpenInnerContent = true, ...props }: SidebarItemProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    const { user } = useSession();
    const router = useRouter();

    const { classes } = useStyles({ isActive, inner });

    const { setOpenedSidebar } = useContext(AdminSidebarMenuContext);

    const handlerPush = () => {
        if (!href) return;
        router.push(href);
        setOpenedSidebar(false);
    };

    const renderIndicator = () => {
        if (inner || !isActive) {
            return null;
        }

        if (isOpenInnerContent) {
            return (
                <ThemeIcon className={classes.indicatorActive}>
                    <IndicatorIcon />
                </ThemeIcon>
            );
        }

        return <Box className={classes.inducatorCloseInnerContent} />;
    };

    if (isMenuItemDenied(roles, user?.roles[0].id)) {
        return null;
    }

    return (
        <Flex ref={ref} className={classes.root} align="center" onClick={handlerPush} {...props}>
            {renderIndicator()}
            <Flex className={classes.inner}>
                <Flex gap={16}>
                    {!inner && (
                        <Tooltip label={label} position="right" arrowPosition="center">
                            <ThemeIcon className={classes.iconWrapper}>{icon}</ThemeIcon>
                        </Tooltip>
                    )}

                    <Text className={classes.text}>{label}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
});

export default SidebarItem;
