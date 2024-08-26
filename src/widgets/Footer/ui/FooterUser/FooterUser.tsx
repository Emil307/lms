import React, { useMemo } from "react";
import { Divider, Flex, Footer as MFooter, Group, Text, FooterProps as MFooterProps } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import IconHeart from "public/icons/heart.svg";
import { Logo } from "@components/Logo";
import { FilterTypes } from "@shared/constant";
import { Paragraph } from "@shared/ui";
import { useCourseResources } from "@entities/course";
import { useSession } from "@entities/auth";
import { CONTACT } from "@entities/staticPage";
import useStyles from "./FooterUser.styles";
import { getPageSections } from "./utils";

export interface FooterUserProps extends Omit<MFooterProps, "children" | "height"> {}

const FooterUser = ({ hidden = false, ...props }: FooterUserProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const { user } = useSession();

    const courseResources = useCourseResources({ type: FilterTypes.SELECT });

    const handleOpenCoursesPage = () => router.push("/courses");

    const renderCategories = useMemo(() => {
        if (!courseResources.data?.categories.length) {
            return null;
        }

        return (
            <Flex direction="column" gap={8}>
                {courseResources.data.categories.slice(0, 5).map((category) => {
                    const handleClick = () => router.push({ pathname: "/courses", query: { categoryId: category.id.toString() } });
                    return (
                        <Paragraph variant="small-m" key={category.id} className={classes.sectionLink} onClick={handleClick}>
                            {category.name}
                        </Paragraph>
                    );
                })}
                <Paragraph variant="small-m" className={classes.sectionLink} onClick={handleOpenCoursesPage}>
                    Все курсы
                </Paragraph>
            </Flex>
        );
    }, [courseResources]);

    const renderInfoSection = useMemo(
        () =>
            getPageSections(!!user).map((section, index) => (
                <Link key={index} className={classes.sectionLink} href={section.href}>
                    {section.label}
                </Link>
            )),
        [user]
    );

    if (hidden) {
        return null;
    }

    return (
        <MFooter classNames={classes} height="auto" {...props}>
            <Flex className={classes.inner}>
                <Flex className={classes.content}>
                    <Flex direction="column" gap={32} miw={264}>
                        <Logo />
                        <Flex direction="column" gap={8}>
                            <Paragraph variant="large">
                                <a href={`mailto:${CONTACT.EMAIL}`} className={classes.link}>
                                    {CONTACT.EMAIL}
                                </a>
                            </Paragraph>
                            <Paragraph variant="text-caption" color="gray45">
                                Пишите, если есть вопросы
                            </Paragraph>
                        </Flex>
                        <Flex direction="column" gap={8}>
                            <Paragraph variant="large">
                                <a href={`tel:${CONTACT.PHONE_NUMBER_LINK}`} className={classes.link}>
                                    {CONTACT.PHONE_NUMBER}
                                </a>
                            </Paragraph>
                            <Paragraph variant="text-caption" color="gray45" maw={180}>
                                Звоните, если нужна помощь. Звонок по России бесплатный.
                            </Paragraph>
                        </Flex>
                    </Flex>

                    <Flex className={classes.popularSectionContainer}>
                        <Text className={classes.titleSection}>Популярные разделы</Text>
                        {renderCategories}
                    </Flex>

                    <Flex className={classes.infoSectionContainer}>
                        <Text className={classes.titleSection}>Информация</Text>
                        <Flex direction="column" gap={8}>
                            {renderInfoSection}
                        </Flex>
                    </Flex>
                    <Flex gap={16}>
                        <a href={CONTACT.VK} target="_blank" rel="noreferrer">
                            <Flex className={classes.socialLink}>
                                <IconVK />
                            </Flex>
                        </a>

                        <a href={CONTACT.WHATSAPP} target="_blank" rel="noreferrer">
                            <Flex className={classes.socialLink}>
                                <IconWhatsapp />
                            </Flex>
                        </a>

                        <a href={CONTACT.TELEGRAM} target="_blank" rel="noreferrer">
                            <Flex className={classes.socialLink}>
                                <IconTelegram />
                            </Flex>
                        </a>
                    </Flex>
                </Flex>
                <Divider my="sm" color="gray20" mt={0} mb={0} />
                <Group sx={{ paddingBlock: 32, justifyContent: "space-between" }}>
                    <Paragraph variant="text-small-m">{`© ${dayjs().year()}, Addamant`}</Paragraph>
                    <Flex className={classes.bottomWrapper}>
                        <Text fw={600} td="underline" component="a" href="/user-agreement">
                            Пользовательское соглашение
                        </Text>
                        <Text className={classes.addamant} component="a" href={CONTACT.ADDAMANT} target="_blank">
                            <Paragraph className={classes.addamantText} variant="text-small-m" component="span">
                                <Paragraph variant="text-small-m" component="span">
                                    Created with
                                </Paragraph>
                                <Text className={classes.heartIcon} component="span">
                                    <IconHeart />
                                </Text>
                                <Paragraph variant="text-small-m" component="span">
                                    at
                                </Paragraph>
                                <Paragraph variant="text-small-semi" td="underline" component="span">
                                    addamant
                                </Paragraph>
                            </Paragraph>
                        </Text>
                    </Flex>
                </Group>
            </Flex>
        </MFooter>
    );
};

export default FooterUser;
