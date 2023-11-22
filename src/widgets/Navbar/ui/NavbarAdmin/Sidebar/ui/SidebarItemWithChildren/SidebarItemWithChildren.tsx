import React, { ReactNode, useContext, useEffect, useRef } from "react";
import { Accordion, Box } from "@mantine/core";
import { Minus, Plus } from "react-feather";
import { useUserRole } from "@entities/auth/hooks";
import { isMenuItemDenied } from "@widgets/Navbar/utils";
import { useMedia } from "@shared/utils";
import useStyles from "./SidebarItemWithChildren.styles";
import SidebarItem, { SidebarItemProps } from "../SidebarItem/SidebarItem";
import { SidebarItemsWithChildrenContext } from "../../utils";
import { SidebarMinimizedModeContext } from "../../../utils";

interface SidebarItemWithChildrenProps extends Omit<SidebarItemProps, "href"> {
    children: ReactNode;
    href: string;
}

export default function SidebarItemWithChildren({
    children,
    icon,
    isActive = false,
    label,
    roles = [],
    href,
}: SidebarItemWithChildrenProps) {
    const userRole = useUserRole();
    const lastElementRef = useRef<HTMLDivElement>(null);

    const { isMinimizedModeSidebar, setIsMinimizedModeSidebar } = useContext(SidebarMinimizedModeContext);
    const { activeSidebarItemsWithChildren, setActiveSidebarItemsWithChildren } = useContext(SidebarItemsWithChildrenContext);

    const isTablet = useMedia("lg");

    const isOpened = activeSidebarItemsWithChildren.includes(href);

    const handleChangeActiveSidebarItemWithChildren = () => {
        if (!isTablet) {
            if (activeSidebarItemsWithChildren.includes(href)) {
                return setActiveSidebarItemsWithChildren(activeSidebarItemsWithChildren.filter((item) => item !== href));
            }
            return setActiveSidebarItemsWithChildren([...activeSidebarItemsWithChildren, href]);
        }
        if (href === activeSidebarItemsWithChildren[0]) {
            setActiveSidebarItemsWithChildren([]);
            return setIsMinimizedModeSidebar(true);
        }

        setIsMinimizedModeSidebar(false);
        setActiveSidebarItemsWithChildren([href]);
    };

    const handlerOpen = () => handleChangeActiveSidebarItemWithChildren();

    const { classes } = useStyles({ isActive, isMinimizedModeSidebar });

    useEffect(() => {
        if (isOpened) {
            setTimeout(() => {
                lastElementRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }, 200);
        }
    }, [isOpened]);

    if (isMenuItemDenied(roles, userRole)) {
        return null;
    }

    return (
        <Accordion value={isOpened ? label : null} classNames={classes} chevron={isOpened ? <Minus /> : <Plus />}>
            <Accordion.Item value={label} sx={{ backgroundColor: "transparent", "&[data-active]": { boxShadow: "none" } }}>
                <Accordion.Control p={0} onClick={handlerOpen}>
                    <SidebarItem icon={icon} isActive={isActive} label={label} isOpenInnerContent={isOpened} />
                </Accordion.Control>
                <Accordion.Panel pl={56} mt={2}>
                    {!isMinimizedModeSidebar && <Box ref={lastElementRef}>{children}</Box>}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
