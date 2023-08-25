import { Flex } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { List as CourseCollectionList } from "@features/courseCollections";
import { TRouterQueries } from "@shared/types";
import { List as CoursesList } from "@features/courses";
import { useCourseCollection } from "@entities/courseCollection";
import { getIcon } from "@shared/utils";
import { getBreadCrumbsItems } from "./utils";

const CourseCollectionDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data } = useCourseCollection({ id });

    return (
        <Flex direction="column">
            <BreadCrumbs items={getBreadCrumbsItems({ name: data?.name, id })} mb={8} />
            <Flex direction="column" gap={32}>
                <Flex align="center" gap={12}>
                    <Flex sx={(theme) => ({ svg: { color: theme.colors.primary[0] } })}>
                        {getIcon({ iconName: data?.iconName, color: "primary", size: 32, strokeWidth: 1.5 })}
                    </Flex>
                    <Heading>{data?.name}</Heading>
                </Flex>
                <CoursesList collectionIds={id} withPagination />
            </Flex>
            <Flex direction="column" gap={32} mt={64}>
                <Heading order={2}>Другие актуальные подборки</Heading>
                <CourseCollectionList perPage={1} hasCardMore exceptionCourseCollectionId={id} colProps={{ sm: 6, xs: 12 }} />
            </Flex>
        </Flex>
    );
};

export default CourseCollectionDetailsPage;
