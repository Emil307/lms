import { Box, Group } from "@mantine/core";
import { MRT_Cell } from "mantine-react-table";
import { useRouter } from "next/router";
import { FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { FRadioGroup, Radio } from "@shared/ui/Forms/RadioGroup";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticle, AdminArticlesFilters, articleApi, useAdminArticleResource } from "@entities/article";
import { columns, radioGroupValues, filterInitialValues, columnOrder } from "./constants";
import { ListMenu } from "./components";
import { $validationSchema } from "./types/validation";

const List = () => {
    const router = useRouter();
    const articleResources = useAdminArticleResource();

    const handleClickCell = (cell: MRT_Cell<AdminArticle>) => {
        router.push({ pathname: "/admin/articles/[id]", query: { id: cell.row.original.id.toString() } });
    };

    return (
        <Box mt={24}>
            <ManagedDataGrid<AdminArticle, AdminArticlesFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLES}
                queryFunction={(params) => articleApi.getAdminArticles(params)}
                queryCacheKeys={["page", "perPage", "sort", "isActive", "query", "categoryId", "subcategoryId", "courseId"]}
                filter={{
                    initialValues: filterInitialValues,
                    validationSchema: $validationSchema,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                onClickCell={handleClickCell}
                columns={columns}
                countName="Статей"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => {
                    return <ListMenu row={row} />;
                }}>
                <Box mb={24}>
                    <Group sx={{ gap: 8 }}>
                        <FSearch w="100%" maw={512} size="sm" name="query" placeholder="Поиск" />
                        <FSelect
                            name="courseId"
                            size="sm"
                            data={prepareOptionsForSelect({ data: articleResources.data?.courses.data, value: "id", label: "name" })}
                            clearable
                            label="Курс"
                            disabled={articleResources.isLoading}
                            w="100%"
                            maw={252}
                        />
                        <FSelect
                            name="categoryId"
                            size="sm"
                            data={prepareOptionsForSelect({ data: articleResources.data?.categories.data, value: "id", label: "name" })}
                            clearable
                            label="Категория"
                            disabled={articleResources.isLoading}
                            w="100%"
                            maw={252}
                        />
                        <FSelect
                            name="subcategoryId"
                            size="sm"
                            data={prepareOptionsForSelect({ data: articleResources.data?.subcategories.data, value: "id", label: "name" })}
                            clearable
                            label="Подкатегория"
                            disabled={articleResources.isLoading}
                            w="100%"
                            maw={252}
                        />
                    </Group>
                    <Box mt={16}>
                        <FRadioGroup name="isActive" defaultValue="">
                            {radioGroupValues.map((item) => {
                                return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                            })}
                        </FRadioGroup>
                    </Box>
                    <Button mt={16} type="submit" w="100%" maw={164}>
                        Найти
                    </Button>
                </Box>
            </ManagedDataGrid>
        </Box>
    );
};

export default List;
