import React, { ForwardedRef, ReactNode, forwardRef, useContext } from "react";
import { useRouter } from "next/router";
import { ThemeIcon, Text, Flex, FlexProps, Box } from "@mantine/core";
import { LinkProps } from "next/link";
import IndicatorIcon from "@public/icons/indicator.svg";
import { Tooltip } from "@shared/ui";
import { useUserRole } from "@entities/auth/hooks";
import { isMenuItemDenied } from "@widgets/Navbar/utils";
import useStyles from "./SidebarItem.styles";
import { SidebarAdminContext } from "../../utils";

export interface SidebarItemProps extends Omit<FlexProps, "children"> {
    icon?: ReactNode;
    label: string;
    isActive?: boolean;
    href?: LinkProps["href"];
    isInner?: boolean;
    roles?: number[];
    isOpenInnerContent?: boolean;
}

const SidebarItem = forwardRef(function SidebarItem(
    { icon, label, isActive = false, href, isInner = false, roles = [], isOpenInnerContent = true, ...props }: SidebarItemProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    const userRole = useUserRole();
    const router = useRouter();

    const { classes } = useStyles({ isActive, isInner });

    const { isMinimizedModeSidebar, setActiveSidebarItemsWithChildren } = useContext(SidebarAdminContext);

    const handleClickSidebarItem = () => {
        if (!href) {
            return;
        }
        setActiveSidebarItemsWithChildren([]);
        router.push(href);
    };

    const renderIndicator = () => {
        if (isInner || !isActive) {
            return null;
        }

        if (isOpenInnerContent) {
            return (
                <ThemeIcon className={classes.indicatorActive}>
                    <IndicatorIcon />
                </ThemeIcon>
            );
        }

        return <Box className={classes.indicatorCloseInnerContent} />;
    };

    if (isMenuItemDenied(roles, userRole)) {
        return null;
    }

    return (
        <Flex ref={ref} className={classes.root} align="center" onClick={handleClickSidebarItem} {...props}>
            {renderIndicator()}
            <Flex className={classes.inner}>
                <Flex gap={16}>
                    {!isInner && (
                        <Tooltip label={label} position="right" arrowPosition="center" disabled={!isMinimizedModeSidebar}>
                            <ThemeIcon className={classes.iconWrapper}>{icon}</ThemeIcon>
                        </Tooltip>
                    )}

                    {!isMinimizedModeSidebar && <Text className={classes.text}>{label}</Text>}
                </Flex>
            </Flex>
        </Flex>
    );
});

export default SidebarItem;
