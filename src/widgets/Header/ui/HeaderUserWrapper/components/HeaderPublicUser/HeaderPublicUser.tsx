import React, { useContext, useMemo } from "react";
import { ActionIcon, Flex, Header as MHeader, MediaQuery, Menu as MMenu, ThemeIcon } from "@mantine/core";
import { X } from "react-feather";
import { useRouter } from "next/router";
import Link from "next/link";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import IconBurger from "public/icons/burger.svg";
import LogoImage from "@public/icons/logoNew.svg";
import LogoShortImage from "@public/icons/logoShort.svg";
import { Button, Paragraph } from "@shared/ui";
import { Logo } from "@components/Logo";
import { SidebarMenuContext } from "@app/layouts/UserLayout/utils";
import { useCourseResources } from "@entities/course";
import { FilterTypes } from "@shared/constant";
import { CONTACT } from "@entities/staticPage";
import useStyles from "./HeaderPublicUser.styles";
import { INFORMATION_MENU_ITEMS } from "./constants";

interface HeaderPublicUserProps {
    isTablet: boolean;
}

const HeaderPublicUser = ({ isTablet }: HeaderPublicUserProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const { openedSidebar, setOpenedSidebar } = useContext(SidebarMenuContext);

    const courseResources = useCourseResources({ type: FilterTypes.SELECT });

    const renderCategories = useMemo(() => {
        if (!courseResources.data?.categories.length) {
            return null;
        }

        return (
            <MMenu.Dropdown>
                {courseResources.data.categories.slice(0, 5).map((category) => {
                    return (
                        <MMenu.Item
                            component={Link}
                            href={{ pathname: "/courses", query: { categoryId: category.id.toString() } }}
                            key={category.id}>
                            <Paragraph className={classes.wordBreak} variant="text-small-m">
                                {category.name}
                            </Paragraph>
                        </MMenu.Item>
                    );
                })}
            </MMenu.Dropdown>
        );
    }, [courseResources]);

    const handleChangeOpenedSidebar = () => setOpenedSidebar(!openedSidebar);

    const renderSidebarBurger = () => {
        if (openedSidebar) {
            return (
                <ActionIcon className={classes.closeSidebarIcon} onClick={handleChangeOpenedSidebar}>
                    <X />
                </ActionIcon>
            );
        }

        return (
            <ActionIcon className={classes.burgerSidebarIcon} onClick={handleChangeOpenedSidebar}>
                <IconBurger />
            </ActionIcon>
        );
    };

    return (
        <MHeader classNames={classes} height="auto" fixed={false}>
            <Flex className={classes.inner}>
                <Flex align="center" gap={56}>
                    <Link className={classes.logo} href="/" onClick={() => setOpenedSidebar(false)}>
                        <Logo icon={isTablet ? <LogoShortImage /> : <LogoImage />} />
                    </Link>
                    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                        <Flex gap={48}>
                            <MMenu width={164} offset={8} withinPortal position="bottom-start" trigger="hover" zIndex={400}>
                                <MMenu.Target>
                                    <Button component={Link} href="/courses" variant="text" size="large">
                                        Онлайн-курсы
                                    </Button>
                                </MMenu.Target>
                                {renderCategories}
                            </MMenu>
                            <MMenu width={164} offset={8} withinPortal position="bottom-start" trigger="hover" zIndex={400}>
                                <MMenu.Target>
                                    <Button className={classes.menuButton} variant="text" size="large">
                                        Информация
                                    </Button>
                                </MMenu.Target>
                                <MMenu.Dropdown>
                                    {INFORMATION_MENU_ITEMS.map((item) => (
                                        <MMenu.Item component={Link} href={item.href} key={item.href}>
                                            <Paragraph className={classes.wordBreak} variant="text-small-m">
                                                {item.label}
                                            </Paragraph>
                                        </MMenu.Item>
                                    ))}
                                </MMenu.Dropdown>
                            </MMenu>
                        </Flex>
                    </MediaQuery>
                </Flex>

                <Flex align="center" gap={32}>
                    <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                        <a className={classes.tgLink} href={CONTACT.TELEGRAM_BOT} target="_blank" rel="noreferrer">
                            <Flex align="center" gap={16}>
                                <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                                    <Flex direction="column" align="flex-end">
                                        <Paragraph variant="small-m">Поддержка в Telegram</Paragraph>
                                        <Paragraph className={classes.email} variant="text-small-m" color="neutralMain50">
                                            {CONTACT.EMAIL}
                                        </Paragraph>
                                    </Flex>
                                </MediaQuery>
                                <ThemeIcon className={classes.buttonIcon}>
                                    <IconTelegram />
                                </ThemeIcon>
                            </Flex>
                        </a>
                    </MediaQuery>

                    <Flex align="center" gap={12}>
                        <Button
                            component={Link}
                            href={{ query: { ...router.query, action: "auth" } }}
                            variant="border"
                            size={isTablet ? "medium" : "large"}>
                            Войти
                        </Button>
                        {renderSidebarBurger()}
                    </Flex>
                </Flex>
            </Flex>
        </MHeader>
    );
};

export default HeaderPublicUser;
