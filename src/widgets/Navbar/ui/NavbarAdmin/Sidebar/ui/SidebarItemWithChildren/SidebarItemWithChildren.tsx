import React, { ReactNode, useContext, useEffect, useRef } from "react";
import { Accordion, Box } from "@mantine/core";
import { Minus, Plus } from "react-feather";
import { useSession } from "@features/auth";
import { isMenuItemDenied } from "@widgets/Navbar/utils";
import useStyles from "./SidebarItemWithChildren.styles";
import SidebarItem, { SidebarItemProps } from "../SidebarItem/SidebarItem";
import { MinimizedModeSidebarContext } from "../../utils";

interface SidebarItemWithChildrenProps extends Omit<SidebarItemProps, "href"> {
    children: ReactNode;
    isOpen?: boolean;
    itemId: string;
    setIsOpenSidebarItem: (itemId: string) => void;
}

export default function SidebarItemWithChildren({
    children,
    icon,
    isActive = false,
    label,
    roles = [],
    isOpen,
    itemId,
    setIsOpenSidebarItem,
}: SidebarItemWithChildrenProps) {
    const { user } = useSession();
    const lastElementRef = useRef<HTMLDivElement>(null);

    const { isMinimizedModeSidebar } = useContext(MinimizedModeSidebarContext);

    const handlerOpen = () => setIsOpenSidebarItem(itemId);

    const { classes } = useStyles({ isActive, isMinimizedModeSidebar });

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                lastElementRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }, 200);
        }
    }, [isOpen]);

    if (isMenuItemDenied(roles, user?.roles[0].id)) {
        return null;
    }

    return (
        <Accordion value={isOpen ? label : null} classNames={classes} chevron={isOpen ? <Minus /> : <Plus />}>
            <Accordion.Item value={label} sx={{ backgroundColor: "transparent", "&[data-active]": { boxShadow: "none" } }}>
                <Accordion.Control p={0} onClick={handlerOpen}>
                    <SidebarItem icon={icon} isActive={isActive} label={label} isOpenInnerContent={isOpen} />
                </Accordion.Control>
                <Accordion.Panel pl={56} mt={2}>
                    {!isMinimizedModeSidebar && <Box ref={lastElementRef}>{children}</Box>}
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
