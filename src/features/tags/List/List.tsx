import { Box, Flex } from "@mantine/core";
import { DataGrid, FSearch } from "@shared/ui";
import { Button } from "@shared/ui";
import { AdminTag, tagApi, TagsFilters } from "@entities/tag";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues } from "./constant";
import { ListMenu } from "./components";

const List = () => {
    return (
        <Box mt={24}>
            <DataGrid<AdminTag, TagsFilters>
                queryKey={QueryKeys.GET_ADMIN_TAGS}
                queryFunction={(params) => tagApi.getAdminTags(params)}
                queryCacheKeys={["page", "perPage", "sort", "query"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                columns={columns}
                countName="Тегов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                {({ dirty }) => (
                    <Flex columnGap={16} rowGap={0}>
                        <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                        <Button type="submit" disabled={!dirty} w="100%" maw={164}>
                            Найти
                        </Button>
                    </Flex>
                )}
            </DataGrid>
        </Box>
    );
};

export default List;
