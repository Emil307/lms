import { Box, BoxProps, Flex } from "@mantine/core";
import { FSearch, ManagedDataGrid, Button } from "@shared/ui";
import { AdminTagFromList, tagApi, TagsFilters } from "@entities/tag";
import { EntityNames, QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues } from "./constant";
import { ListMenu } from "./components";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    return (
        <Box {...props}>
            <ManagedDataGrid<AdminTagFromList, TagsFilters>
                queryKey={[QueryKeys.GET_ADMIN_TAGS, [EntityNames.TAG]]}
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
                {({ dirty, handleReset }) => {
                    return (
                        <Flex direction={{ base: "column", xs: "row" }} gap={16}>
                            <FSearch name="query" placeholder="Поиск" size="sm" w="100%" maw={512} />
                            <Flex gap={16} sx={{ flex: 1 }}>
                                <Button type="submit" w="100%" miw={130} maw={164}>
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button variant="white" w="100%" miw={130} maw={164} onClick={handleReset}>
                                        Сбросить
                                    </Button>
                                )}
                            </Flex>
                        </Flex>
                    );
                }}
            </ManagedDataGrid>
        </Box>
    );
};

export default AdminList;
