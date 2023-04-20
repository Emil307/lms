import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { DataGrid, FSearch } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { Author, AuthorsFilters, authorApi } from "@entities/author";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";

const List = () => {
    const router = useRouter();

    const openAuthorDetailPage = (id: number) => router.push({ pathname: "/admin/settings/authors/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<Author>) => {
        if (cell.column.id === "mrt-row-actions") return;
        openAuthorDetailPage(cell.row.original.id);
    };

    return (
        <Box>
            <DataGrid<Author, AuthorsFilters>
                queryKey={QueryKeys.GET_AUTHORS}
                queryFunction={(params) => authorApi.getAuthors(params)}
                queryCacheKeys={["page", "perPage", "sort", "isActive", "query"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Авторов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                {({ dirty }) => (
                    <Box mb={24}>
                        <Flex gap={16}>
                            <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                            <Button type="submit" w="100%" maw={164} disabled={!dirty}>
                                Найти
                            </Button>
                        </Flex>
                        <Box mt={16}>
                            <FRadioGroup name="isActive" defaultValue="">
                                {radioGroupValues.map((item) => {
                                    return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                })}
                            </FRadioGroup>
                        </Box>
                    </Box>
                )}
            </DataGrid>
        </Box>
    );
};

export default List;
