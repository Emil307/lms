import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FDateRangePicker, FRadioGroup, FSearch, ManagedDataGrid, Radio } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { radioGroupValues, columns, filterInitialValues } from "./constants";
import { ListMenu } from "./components";
import { AdminLessonFromList, AdminLessonsFilters, lessonApi } from "@entities/lesson";
import { adaptGetAdminLessonsRequest } from "@widgets/admin/lessons/List/utils";

const List = () => {
    const router = useRouter();

    const openLessonDetail = (id: number) => {
        router.push({ pathname: "/admin/settings/categories/[id]", query: { id: String(id) } });
    };

    const handlerClickCell = (cell: MRT_Cell<AdminLessonFromList>) => {
        //TODO Редирект на деталку урока
        openLessonDetail(cell.row.original.id);
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
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Уроков"
                initialState={{
                    columnOrder: ["id", "name", "description", "createdAt", "isActive"],
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                <Flex gap={16} direction="column">
                    <Flex gap={8}>
                        <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                        <FDateRangePicker name="createdAtFrom" nameTo="createdAtTo" label="Дата создания" size="sm" w="100%" maw={252} />
                    </Flex>
                    <FRadioGroup name="isActive" defaultValue="">
                        {radioGroupValues.map((item) => {
                            return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                        })}
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
