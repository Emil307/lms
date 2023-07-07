import { Flex, Group, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import * as TablerIcons from "@tabler/icons";
import * as FeatherIcons from "react-feather";
import { BreadCrumbs } from "@shared/ui";
import { List as CourseCollectionList } from "@features/courseCollections";
import { TRouterQueries } from "@shared/types";
import { List as CoursesList } from "@features/courses";
import { useCourseCollection } from "@entities/courseCollection";
import { getBreadCrumbsItems } from "./utils";

const CourseCollectionDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data } = useCourseCollection({ id });

    const getIcon = () => {
        const IconTabler = data && data.iconName in TablerIcons ? TablerIcons[data.iconName as keyof typeof TablerIcons] : null;

        if (IconTabler) {
            return <IconTabler width={32} height={32} strokeWidth={1} />;
        }

        const IconFeater =
            data && data.iconName in FeatherIcons ? FeatherIcons[data.iconName as keyof typeof FeatherIcons] : FeatherIcons.Image;
        return <IconFeater width={32} height={32} strokeWidth={1} />;
    };

    return (
        <Flex direction="column">
            <BreadCrumbs items={getBreadCrumbsItems({ name: data?.name, id })} mb={8} />
            <Flex direction="column" gap={32}>
                <Flex gap={12}>
                    <Group
                        sx={(theme) => ({
                            color: theme.colors.secondary[0],
                        })}>
                        {getIcon()}
                    </Group>
                    <Title order={1} color="dark">
                        {data?.name}
                    </Title>
                </Flex>
                <CoursesList collectionIds={id} withPagination />
            </Flex>
            <Flex direction="column" gap={32} mt={64}>
                <Title order={2} color="dark">
                    Другие актуальные подборки
                </Title>
                <CourseCollectionList perPage={1} hasCardMore exceptionCourseCollectionId={id} colProps={{ sm: 6, xs: 12 }} />
            </Flex>
        </Flex>
    );
};

export default CourseCollectionDetailsPage;
