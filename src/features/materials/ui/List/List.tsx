import { Box, Flex } from "@mantine/core";
import { FDateRangePicker, FRadioGroup, FSearch, FSelect, ManagedDataGrid, Radio } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { UploadedFileFromList, UploadedFilesFiltersForm, storageApi, useUploadedFileResources } from "@entities/storage";
import { columnOrder, columns, filterInitialValues, radioGroupValues } from "./constant";
import { ListMenu } from "./components";
import { adaptGetMaterialFilesRequest } from "./utils";

const List = () => {
    const materialResources = useUploadedFileResources();

    const categoriesOptions = materialResources.data?.categories.map((item) => ({
        value: String(item.id),
        label: item.name,
    }));

    const typesOptions = materialResources.data?.types.map((item) => ({
        value: item.type,
        label: item.name,
    }));

    return (
        <ManagedDataGrid<UploadedFileFromList, UploadedFilesFiltersForm>
            queryKey={QueryKeys.GET_UPLOADED_FILES}
            queryFunction={(params) => storageApi.getUploadedFiles(adaptGetMaterialFilesRequest(params))}
            queryCacheKeys={["page", "perPage", "sort", "query", "type", "isActive", "createdAtFrom", "createdAtTo", "categoryIds"]}
            filter={{
                initialValues: filterInitialValues,
            }}
            renderActiveBadge={(cell) => cell.row.original.isActive}
            columns={columns}
            countName="Материалов"
            initialState={{
                columnOrder,
            }}
            renderRowActions={({ row }) => <ListMenu row={row} />}>
            {({ dirty, resetForm }) => (
                <Box mb={24}>
                    <Flex columnGap={8} rowGap={0}>
                        <FSearch w={380} size="sm" name="query" placeholder="Поиск" />
                        <FSelect
                            name="categoryIds"
                            size="sm"
                            data={categoriesOptions ?? []}
                            clearable
                            label="Категория"
                            disabled={materialResources.isLoading}
                        />
                        <FSelect
                            name="type"
                            size="sm"
                            data={typesOptions ?? []}
                            clearable
                            label="Тип файла"
                            disabled={materialResources.isLoading}
                        />
                        <FDateRangePicker name="createdAtFrom" nameTo="createdAtTo" label="Дата создания" size="sm" clearable maw={210} />
                    </Flex>
                    <Box mt={16}>
                        <FRadioGroup name="isActive" defaultValue="">
                            {radioGroupValues.map((item) => (
                                <Radio size="md" key={item.id} label={item.label} value={item.value} />
                            ))}
                        </FRadioGroup>
                    </Box>
                    <Flex gap={16} mt={16}>
                        <Button type="submit" w="100%" maw={164}>
                            Найти
                        </Button>
                        {dirty && (
                            <Button type="button" variant="white" onClick={resetForm} w="100%" maw={164}>
                                Cбросить
                            </Button>
                        )}
                    </Flex>
                </Box>
            )}
        </ManagedDataGrid>
    );
};

export default List;
