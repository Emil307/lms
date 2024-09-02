import React, { useMemo } from "react";
import { Flex } from "@mantine/core";
import Link from "next/link";
import { useCourseResources } from "@entities/course";
import { FilterTypes } from "@shared/constant";
import { Paragraph } from "@shared/ui";
import useStyles from "./SidebarMenu.styles";
import { INFORMATION_MENU_ITEMS } from "./constants";

const SidebarMenu = () => {
    const { classes } = useStyles();
    const courseResources = useCourseResources({ type: FilterTypes.SELECT });

    const categories = useMemo(() => {
        if (!courseResources.data?.categories.length) {
            return null;
        }

        return (
            <Flex className={classes.group}>
                <Paragraph variant="text-small-m" color="gray45">
                    Направления обучения
                </Paragraph>
                <Flex className={classes.listItems}>
                    {courseResources.data.categories.slice(0, 5).map((category) => {
                        return (
                            <Paragraph
                                component={Link}
                                href={{ pathname: "/courses", query: { categoryId: category.id.toString() } }}
                                className={classes.link}
                                variant="small-m"
                                key={category.id}>
                                {category.name}
                            </Paragraph>
                        );
                    })}
                </Flex>
            </Flex>
        );
    }, [courseResources]);

    return (
        <Flex direction="column" gap={24}>
            {categories}
            <Flex className={classes.group}>
                <Paragraph variant="text-small-m" color="gray45">
                    Информация
                </Paragraph>
                <Flex className={classes.listItems}>
                    {INFORMATION_MENU_ITEMS.map((item, index) => (
                        <Paragraph component={Link} href={item.href} className={classes.link} variant="small-m" key={index}>
                            {item.label}
                        </Paragraph>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default SidebarMenu;
