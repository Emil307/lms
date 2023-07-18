import React, { ReactNode, useEffect, useRef } from "react";
import { Accordion, Box } from "@mantine/core";
import { Minus, Plus } from "react-feather";
import { useToggle } from "@mantine/hooks";
import useStyles from "./SidebarItemWithChildren.styles";
import SidebarItem, { SidebarItemProps } from "../SidebarItem/SidebarItem";

interface SidebarItemWithChildrenProps extends Omit<SidebarItemProps, "href"> {
    children: ReactNode;
}

export default function SidebarItemWithChildren({ children, icon, isActive = false, label, roles = [] }: SidebarItemWithChildrenProps) {
    const [isOpen, setIsOpen] = useToggle();

    const lastElementRef = useRef<HTMLDivElement>(null);

    const role = "ADMIN";
    const handlerOpen = () => {
        setIsOpen();
    };

    const { classes } = useStyles({ isActive });

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                lastElementRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }, 200);
        }
    }, [isOpen]);

    //TODO: Это условие пока убрано, вернемся позднее
    if (!roles.includes(role)) {
        return null;
    }
    return (
        <Accordion classNames={classes} chevron={isOpen ? <Minus /> : <Plus />}>
            <Accordion.Item value={label} sx={{ backgroundColor: "transparent", "&[data-active]": { boxShadow: "none" } }}>
                <Accordion.Control p={0} onClick={handlerOpen}>
                    <SidebarItem icon={icon} isActive={isActive} label={label} isOpenInnerContent={isOpen} />
                </Accordion.Control>
                <Accordion.Panel pl={56} mt={2}>
                    <Box ref={lastElementRef}>{children}</Box>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
