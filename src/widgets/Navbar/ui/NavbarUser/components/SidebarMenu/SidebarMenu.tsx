import { Flex } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import useStyles from "./SidebarMenu.styles";
import { NAVBAR_MENU_ITEMS } from "./constants";

const SidebarMenu = () => {
    const { classes } = useStyles();
    const router = useRouter();

    return (
        <Flex direction="column" gap={16} align="flex-start">
            {NAVBAR_MENU_ITEMS.map((item, index) => (
                <Button
                    className={classes.buttonLink}
                    component={Link}
                    href={item.href}
                    leftIcon={item.icon}
                    variant="white"
                    sx={(theme) => ({
                        backgroundColor: router.pathname.startsWith(item.href.pathname) ? theme.colors.neutralGray100[0] : "transparent",
                    })}
                    key={index}>
                    {item.label}
                </Button>
            ))}
        </Flex>
    );
};

export default SidebarMenu;
