import { Box, BoxProps } from "@mantine/core";
import { useRouter } from "next/router";
import { List as ListComponent, ListProps as TListProps } from "@components/List";
import { Course, useCourses } from "@entities/course";
import { EmptyData } from "@shared/ui";
import { initialParams } from "./constants";
import { adaptGetCoursesRequest } from "./utils";
import { TRouterQueries } from "./types";
import { Card } from "../Card";

export interface ListProps extends BoxProps, Pick<TListProps<Course>, "colProps"> {
    collectionIds?: string;
}

const List = ({ collectionIds, colProps = { md: 4, sm: 6 }, ...props }: ListProps) => {
    const router = useRouter();
    const params = router.query as TRouterQueries;

    const {
        data: courseSetsData,
        isFetching,
        isLoading,
    } = useCourses(adaptGetCoursesRequest({ ...initialParams, ...params, collectionIds }));

    const handleClickCard = (id: unknown) => router.push({ pathname: "/courses/[id]", query: { id: String(id) } });

    if (!isLoading && !courseSetsData?.data.length) {
        return <EmptyData title="Такого пока нет. Попробуете изменить запрос?" />;
    }

    return (
        <Box {...props} w="100%">
            <ListComponent<Course>
                data={courseSetsData?.data}
                renderItem={(props) => <Card {...props} />}
                colProps={colProps}
                withPagination
                pagination={courseSetsData?.pagination}
                declensionWordCountItems={["курс", "курса", "курсов"]}
                isLoading={isFetching}
                onClick={handleClickCard}
            />
        </Box>
    );
};

export default List;
