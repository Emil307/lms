import React, { useMemo } from "react";
import { Divider, Flex, Footer as MFooter, FooterProps as MFooterProps, Skeleton } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import IconWhatsapp from "public/icons/icon24px/social/whatsapp.svg";
import IconTelegram from "public/icons/icon24px/social/telegram.svg";
import IconVK from "public/icons/icon24px/social/VK.svg";
import License from "public/license.png";
import LogoShort from "public/icons/logoShort.svg";
import { Logo } from "@components/Logo";
import { FilterTypes } from "@shared/constant";
import { Paragraph } from "@shared/ui";
import { useCourseResources } from "@entities/course";
import { useSession } from "@entities/auth";
import { CONTACT, useContacts } from "@entities/staticPage";
import useStyles from "./FooterUser.styles";
import { getPageSections } from "./utils";

export interface FooterUserProps extends Omit<MFooterProps, "children" | "height"> {}

const FooterUser = ({ hidden = false, ...props }: FooterUserProps) => {
    const { classes, cx } = useStyles();
    const { user } = useSession();

    const { data: contactsData, isLoading: isLoadingContacts } = useContacts();

    const renderAddress = () => {
        if (!contactsData?.title && !isLoadingContacts) {
            return null;
        }
        return (
            <Skeleton className={classes.skeleton} visible={isLoadingContacts} color="dark" mih={24} w={235}>
                <Paragraph className={classes.wordBreak} variant="small-m" color="neutralWhite" maw={235}>
                    {contactsData?.title}
                </Paragraph>
            </Skeleton>
        );
    };

    const { data: courseResources, isLoading: isLoadingCourseResources } = useCourseResources({ type: FilterTypes.SELECT });

    const renderCategories = useMemo(() => {
        if (!courseResources && isLoadingCourseResources) {
            return <Skeleton className={classes.skeleton} visible={isLoadingCourseResources} color="dark" mih={60} w="100%" />;
        }

        if (!courseResources?.categories.length) {
            return null;
        }

        return (
            <Flex direction="column" gap={8}>
                {courseResources.categories.slice(0, 5).map((category) => {
                    return (
                        <Paragraph
                            className={classes.wordBreak}
                            variant="small-m"
                            component={Link}
                            href={{ pathname: "/courses", query: { categoryId: category.id.toString() } }}
                            color="neutralWhite50"
                            w="fit-content"
                            key={category.id}>
                            {category.name}
                        </Paragraph>
                    );
                })}
                <Paragraph variant="small-m" component={Link} href="/courses" color="neutralWhite50" w="fit-content">
                    Все курсы
                </Paragraph>
            </Flex>
        );
    }, [courseResources]);

    const renderInfoSection = useMemo(
        () =>
            getPageSections(!!user).map((section) => (
                <Paragraph
                    className={classes.wordBreak}
                    variant="small-m"
                    component={Link}
                    href={section.href}
                    color="neutralWhite50"
                    w="fit-content"
                    key={section.label}>
                    {section.label}
                </Paragraph>
            )),
        [user],
    );

    if (hidden) {
        return null;
    }

    return (
        <MFooter classNames={classes} height="auto" {...props}>
            <Flex className={classes.inner}>
                <Flex className={classes.topContent}>
                    <Flex className={cx(classes.topContentItem, classes.mainInfo)}>
                        <Logo />
                        <Flex className={classes.mainItem}>
                            <Flex className={classes.item}>
                                <Paragraph variant="small-m" component="a" href={`tel:${CONTACT.PHONE_NUMBER_LINK}`} color="neutralWhite">
                                    {CONTACT.PHONE_NUMBER}
                                </Paragraph>
                                <Paragraph variant="text-caption" color="neutralWhite50">
                                    По вопросам покупки курсов
                                </Paragraph>
                            </Flex>
                            <Flex className={classes.item}>
                                <Paragraph variant="small-m" component="a" href={`mailto:${CONTACT.EMAIL}`} color="neutralWhite">
                                    {CONTACT.EMAIL}
                                </Paragraph>
                                <Paragraph variant="text-caption" color="neutralWhite50">
                                    Пишите, если есть вопросы
                                </Paragraph>
                            </Flex>
                            {renderAddress()}
                        </Flex>
                    </Flex>

                    <Flex className={classes.topContentItem} direction="column" gap={8}>
                        <Image
                            src={License}
                            width={70}
                            height={100}
                            alt="Государственная лицензия"
                            quality={100}
                            style={{
                                objectFit: "cover",
                            }}
                        />
                        <Paragraph variant="text-small-m" color="neutralWhite">
                            Государственная
                            <br /> лицензия
                        </Paragraph>
                    </Flex>

                    <Flex className={cx(classes.topContentItem, classes.education)}>
                        <Paragraph variant="large" color="neutralWhite">
                            Направления обучения
                        </Paragraph>
                        {renderCategories}
                    </Flex>

                    <Flex className={cx(classes.topContentItem, classes.info)}>
                        <Paragraph variant="large" color="neutralWhite">
                            Информация
                        </Paragraph>
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

                <Divider className={classes.divider} my="sm" color="neutralWhite16" />

                <Flex className={classes.middleContent}>
                    <Paragraph variant="text-small-m" component={Link} href="/user-agreement">
                        <Flex className={classes.middleItem}>
                            <Paragraph className={classes.middleLink} variant="text-small-m" color="neutralWhite">
                                Оферта и сведения об образовательных услугах и организации
                            </Paragraph>
                            <Paragraph className={classes.middleLink} variant="text-small-m" color="neutralWhite">
                                Политика обработки персональных данных
                            </Paragraph>
                        </Flex>
                    </Paragraph>

                    <Flex className={classes.middleItem} gap={16}>
                        <Paragraph variant="text-small-m" color="neutralWhite50">
                            Мы используем файлы сoокie для персонализации сервисов и повышения удобства пользования сайтом. Если вы не
                            согласны на их использование, поменяйте настройки браузера.
                        </Paragraph>
                        <Paragraph variant="text-small-m" color="neutralWhite50">
                            Образовательные услуги оказываются ООО &#34;Аддамант&#34; на основании Лицензии № ХХ00-13313131313-13-133131313
                        </Paragraph>
                    </Flex>
                </Flex>

                <Flex className={classes.bottomContent}>
                    <Paragraph variant="text-small-m" color="neutralWhite50">
                        © {dayjs().year()}, Addamant
                    </Paragraph>
                    <a className={classes.addamantLink} href={CONTACT.ADDAMANT} target="_blank" rel="noreferrer">
                        <Flex align="center" gap={8}>
                            <Paragraph variant="text-small-m" color="neutralWhite50">
                                Создано в
                            </Paragraph>
                            <Logo icon={<LogoShort />} />
                        </Flex>
                    </a>
                </Flex>
            </Flex>
        </MFooter>
    );
};

export default FooterUser;
