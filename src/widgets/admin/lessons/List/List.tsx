import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FRadioGroup, FSearch, ManagedDataGrid, Radio } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminLessonFromList, AdminLessonsFilters, lessonApi } from "@entities/lesson";
import { adaptGetAdminLessonsRequest } from "@widgets/admin/lessons/List/utils";
import { radioGroupValues, columns, filterInitialValues } from "./constants";
import { ListMenu } from "./components";

const List = () => {
    const router = useRouter();

    const openLessonDetails = (id: number) => {
        router.push({ pathname: "/admin/lessons/[lessonId]", query: { lessonId: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<AdminLessonFromList>) => {
        openLessonDetails(cell.row.original.id);
    };

    return (
        <Box mt={24}>
            <ManagedDataGrid<AdminLessonFromList, AdminLessonsFilters>
                queryKey={QueryKeys.GET_ADMIN_LESSONS}
                queryFunction={(params) => lessonApi.getAdminLessons(adaptGetAdminLessonsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "isActive", "createdAtFrom", "createdAtTo"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Уроков"
                initialState={{
                    columnOrder: ["id", "name", "description", "createdAt", "isActive", "mrt-row-actions"],
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                <Flex gap={16} direction="column">
                    <Flex gap={8}>
                        <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                        <FDateRangePicker name="createdAtFrom" nameTo="createdAtTo" label="Дата создания" size="sm" w="100%" maw={252} />
                    </Flex>
                    <FRadioGroup name="isActive" defaultValue="">
                        {radioGroupValues.map((item) => (
                            <Radio size="md" key={item.id} label={item.label} value={item.value} />
                        ))}
                    </FRadioGroup>
                    <Button type="submit" w="100%" maw={164}>
                        Найти
                    </Button>
                </Flex>
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
