import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { CourseSet, useCourseSets } from "@entities/courseSet";
import { List as ListComponent } from "@components/List";
import { adaptGetCourseSetsRequest, getInitialParams } from "./utils";
import { Card } from "../Card";
import { CardMore } from "../CardMore";

export interface ListProps {
    exceptionCourseSetId?: string;
    hasCardMore?: boolean;
    perPage?: number;
    withPagination?: boolean;
}

const List = ({ perPage, hasCardMore, exceptionCourseSetId, withPagination = false }: ListProps) => {
    const router = useRouter();
    const page = router.query.page || 1;

    const { data: courseSetsData, isFetching } = useCourseSets(
        adaptGetCourseSetsRequest({ ...getInitialParams(perPage), page: Number(page), exceptionCourseSetId })
    );

    const getCountSets = () => {
        if (!courseSetsData?.pagination.total) {
            return 0;
        }

        return courseSetsData.pagination.total - (perPage || 0);
    };

    const renderCardMore = () => {
        if (!hasCardMore || !courseSetsData?.pagination.total || courseSetsData.pagination.total < 2) {
            return;
        }
        return <CardMore countCardSet={getCountSets()} h={256} />;
    };

    return (
        <Box>
            <ListComponent<CourseSet>
                data={courseSetsData?.data}
                renderItem={(props) => <Card {...props} />}
                colProps={{ sm: 6, xs: 12 }}
                withPagination={withPagination}
                pagination={courseSetsData?.pagination}
                declensionWordCountItems={["подборка", "подборки", "подборок"]}
                isLoading={isFetching}
                cardMore={renderCardMore()}
            />
        </Box>
    );
};

export default List;
