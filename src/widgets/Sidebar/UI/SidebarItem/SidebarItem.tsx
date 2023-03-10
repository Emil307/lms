import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { ThemeIcon, Group, Text, useMantineTheme, Box, Flex } from "@mantine/core";
import { LinkProps } from "next/link";
import { useSidebarStyles } from "./SidebarItemStyles";

export interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    isActive?: boolean;
    href?: LinkProps["href"];
    inner?: boolean;
    roles?: string[];
}

const SidebarItem = ({ icon, label, isActive = false, href, inner = false, roles }: SidebarItemProps) => {
    const theme = useMantineTheme();
    const router = useRouter();
    const role = "USER";

    const { classes } = useSidebarStyles({ isActive, inner });

    const handlerPush = () => {
        if (!href) return;
        router.push(href);
    };

    if (roles && !roles.includes(role)) {
        return null;
    }

    return (
        <Flex className={classes.wrapper} align="center" onClick={handlerPush}>
            {!inner && <Box className={classes.indicator}></Box>}
            <Flex className={classes.name}>
                <Group>
                    {!inner && (
                        <ThemeIcon color="background">
                            {React.cloneElement(icon as React.ReactElement, {
                                color: isActive ? theme.colors.secondary[0] : theme.colors.gray45[0],
                            })}
                        </ThemeIcon>
                    )}

                    <Text className={classes.text}>{label}</Text>
                </Group>
            </Flex>
        </Flex>
    );
};

export default SidebarItem;
