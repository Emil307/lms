import React, { ReactNode } from "react";
import { Accordion } from "@mantine/core";
import { useSidebarItemWithChildrenStyles } from "./useSidebarItemWithChildrenStyles";
import SidebarItem, { SidebarItemProps } from "../SidebarItem/SidebarItem";
import { Minus, Plus } from "react-feather";
import { useToggle } from "@mantine/hooks";
interface SidebarItemWithChildrenProps extends Omit<SidebarItemProps, "href"> {
    children: ReactNode;
}

export default function SidebarItemWithChildren({ children, icon, isActive = false, label, roles }: SidebarItemWithChildrenProps) {
    const [isOpen, setIsOpen] = useToggle();
    const role = "ADMIN";
    const handlerOpen = () => {
        setIsOpen();
    };

    const { classes } = useSidebarItemWithChildrenStyles();

    if (roles && !roles.includes(role)) {
        return null;
    }
    return (
        <Accordion classNames={classes} onClick={handlerOpen} chevron={isOpen ? <Minus /> : <Plus />}>
            <Accordion.Item value={label}>
                <Accordion.Control p={0}>
                    <SidebarItem icon={icon} isActive={isActive} label={label} />
                </Accordion.Control>
                <Accordion.Panel pl={56}>{children}</Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
