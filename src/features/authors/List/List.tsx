import { Box, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, ManagedDataGrid } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { AdminAuthorFromList, AdminAuthorsFiltersForm, authorApi } from "@entities/author";
import { QueryKeys } from "@shared/constant";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminAuthorsRequest } from "./utils";

const List = () => {
    const router = useRouter();

    const openAuthorDetailPage = (id: number) => router.push({ pathname: "/admin/settings/authors/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<AdminAuthorFromList>) => {
        openAuthorDetailPage(cell.row.original.id);
    };

    return (
        <Box>
            <ManagedDataGrid<AdminAuthorFromList, AdminAuthorsFiltersForm>
                queryKey={QueryKeys.GET_ADMIN_AUTHORS}
                queryFunction={(params) => authorApi.getAdminAuthors(adaptGetAdminAuthorsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "isActive"]}
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
                <Box mb={24}>
                    <Flex gap={16}>
                        <FSearch name="query" placeholder="Поиск" w="100%" maw={512} size="sm" />
                        <Button type="submit" w="100%" maw={164}>
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
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
