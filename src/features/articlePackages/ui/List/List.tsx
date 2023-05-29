import { Box, Group } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import {
    AdminArticlePackage,
    AdminArticlePackagesFilters,
    articlePackageApi,
    useAdminArticlePackageResource,
} from "@entities/articlePackage";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";

const List = () => {
    const router = useRouter();
    const articlePackageResources = useAdminArticlePackageResource();

    const openArticlePackageDetailPage = (id: number) =>
        router.push({ pathname: "/admin/settings/article-packages/[id]", query: { id: id.toString() } });

    const handlerClickCell = (cell: MRT_Cell<AdminArticlePackage>) => {
        openArticlePackageDetailPage(cell.row.original.id);
    };

    return (
        <Box>
            <ManagedDataGrid<AdminArticlePackage, AdminArticlePackagesFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLE_PACKAGES}
                queryFunction={(params) => articlePackageApi.getAdminArticlePackages(params)}
                queryCacheKeys={["page", "perPage", "sort", "isActive", "query", "categoryId", "createdAt"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handlerClickCell}
                columns={columns}
                countName="Подборок"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}>
                {({ dirty }) => (
                    <Box mb={24}>
                        <Group sx={{ gap: 8 }}>
                            <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                            <FSelect
                                name="categoryId"
                                size="sm"
                                data={prepareOptionsForSelect({
                                    data: articlePackageResources.data?.categories,
                                    value: "id",
                                    label: "name",
                                })}
                                clearable
                                label="Категория"
                                disabled={articlePackageResources.isLoading}
                                w="100%"
                                maw={252}
                            />
                            {/* TODO: Добавить фильтра по дате создания и периоду действия, когда бекенд добавит */}
                        </Group>
                        <Box mt={16}>
                            <FRadioGroup name="isActive" defaultValue="">
                                {radioGroupValues.map((item) => {
                                    return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                })}
                            </FRadioGroup>
                        </Box>
                        <Button mt={16} type="submit" w="100%" maw={164} disabled={!dirty}>
                            Найти
                        </Button>
                    </Box>
                )}
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
