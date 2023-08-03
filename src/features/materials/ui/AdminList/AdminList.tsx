import { Box, BoxProps, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FDateRangePicker, FRadioGroup, FSearch, FSelect, ManagedDataGrid, Radio, prepareOptionsForSelect } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { UploadedFileFromList, UploadedFilesFiltersForm, storageApi, useUploadedFileResources } from "@entities/storage";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetMaterialFilesRequest } from "./utils";
import useStyles from "./AdminList.styles";

export interface AdminListProps extends BoxProps {}

const AdminList = (props: AdminListProps) => {
    const { classes } = useStyles();

    const materialResources = useUploadedFileResources();

    const isMobile = useMediaQuery("(max-width: 744px)");

    return (
        <Box {...props}>
            <ManagedDataGrid<UploadedFileFromList, UploadedFilesFiltersForm>
                queryKey={QueryKeys.GET_UPLOADED_FILES}
                queryFunction={(params) => storageApi.getUploadedFiles(adaptGetMaterialFilesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "type", "isActive", "createdAtFrom", "createdAtTo", "categoryIds"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Материалов"
                initialState={{
                    columnOrder,
                }}
                renderRowActions={({ row }) => <ListMenu row={row} />}
                collapsedFiltersBlockProps={{
                    isCollapsed: isMobile,
                }}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch size="sm" name="query" placeholder="Поиск" className={classes.filterSearch} />
                                <FSelect
                                    name="categoryIds"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: materialResources.data?.categories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Категория"
                                    className={classes.filterSelect}
                                    disabled={materialResources.isLoading}
                                />
                                <FSelect
                                    name="type"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: materialResources.data?.types,
                                        value: "type",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Тип файла"
                                    className={classes.filterSelect}
                                    disabled={materialResources.isLoading}
                                />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                    clearable
                                    className={classes.filterDateRangePicker}
                                />
                            </Flex>
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
                                    <Button type="button" variant="white" onClick={handleResetForm} w={164}>
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
