import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { List as ListComponent } from "@components/List";
import { Course, useCourses } from "@entities/course";
import { initialParams } from "./constants";
import { Card } from "../Card";

export interface ListProps {
    collectionIds?: string;
}

const List = ({ collectionIds }: ListProps) => {
    const router = useRouter();
    const page = router.query.page || 1;

    const { data: courseSetsData, isFetching } = useCourses({ ...initialParams, page: Number(page), filter: { collectionIds } });

    const handleClickCard = (id: unknown) => router.push({ pathname: "/courses/[id]", query: { id: String(id) } });

    return (
        <Box>
            <ListComponent<Course>
                data={courseSetsData?.data}
                renderItem={(props) => <Card {...props} />}
                colProps={{ md: 4, sm: 6 }}
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
