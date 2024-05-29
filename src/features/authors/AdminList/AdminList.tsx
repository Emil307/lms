import { Box, BoxProps, Flex } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, ManagedDataGrid } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { AdminAuthorFromList, AdminAuthorsFiltersForm, authorApi } from "@entities/author";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useMedia } from "@shared/utils";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetAdminAuthorsRequest } from "./utils";
import useStyles from "./AdminList.styles";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const isMobile = useMedia("sm");

    const openAuthorDetailPage = (id: number) => router.push({ pathname: "/admin/settings/authors/[id]", query: { id: String(id) } });

    const handlerClickCell = (cell: MRT_Cell<AdminAuthorFromList>) => {
        openAuthorDetailPage(cell.row.original.id);
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminAuthorFromList, AdminAuthorsFiltersForm>
                queryKey={[QueryKeys.GET_ADMIN_AUTHORS, [EntityNames.AUTHOR]]}
                queryFunction={(params) => authorApi.getAdminAuthors(adaptGetAdminAuthorsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "isActive"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Авторов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, handleReset }) => {
                    return (
                        <Flex className={classes.filterWrapper}>
                            <FSearch size="sm" name="query" placeholder="Поиск" className={classes.filterSearch} />

                            <FRadioGroup name="isActive" defaultValue="" className={classes.filterRadioGroup}>
                                {radioGroupValues.map((item) => (
                                    <Radio size="md" key={item.id} label={item.label} value={item.value} />
                                ))}
                            </FRadioGroup>
                            <Flex gap={16}>
                                <Button w={164} type="submit">
                                    Найти
                                </Button>
                                {dirty && (
                                    <Button type="button" variant="white" onClick={handleReset} w={164}>
                                        Cбросить
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
