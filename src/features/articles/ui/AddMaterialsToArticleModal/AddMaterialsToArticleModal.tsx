import { Box, BoxProps, Flex } from "@mantine/core";
import React, { useState } from "react";
import { Button, FDateRangePicker, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import { useAttachMaterialFilesToArticle } from "@entities/article";
import { QueryKeys } from "@shared/constant";
import {
    AdminArticleMaterialsExtraFilters,
    AdminMaterialsNoIncludedArticleFiltersForm,
    UploadedFileFromList,
    storageApi,
    useUploadedFileResources,
} from "@entities/storage";
import { columnOrder, columns, filterInitialValues } from "./constants";
import { adaptGetMaterialsRequest } from "./utils";
import useStyles from "./AddMaterialsToArticleModal.styles";

export interface AddMaterialsToArticleModalProps extends Omit<BoxProps, "children"> {
    articleId: string;
    onClose: () => void;
}

const AddMaterialsToArticleModal = ({ articleId, onClose, ...props }: AddMaterialsToArticleModalProps) => {
    const { classes } = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const fileResources = useUploadedFileResources();
    const attachMaterialsToArticle = useAttachMaterialFilesToArticle(articleId);

    const handleSubmit = () => {
        attachMaterialsToArticle.mutate(
            { fileIds: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<UploadedFileFromList, AdminMaterialsNoIncludedArticleFiltersForm, AdminArticleMaterialsExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_NO_ARTICLE_MATERIALS}
                queryFunction={(params) => storageApi.getUploadedFiles(adaptGetMaterialsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "categoryIds", "type", "createdAtFrom", "createdAtTo", "articleId"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Материалов"
                extraFilterParams={{ articleId: articleId }}
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}
                collapsedFiltersBlockProps={{
                    isCollapsed: true,
                    leftIcon: null,
                    titleOpened: "Показать фильтр",
                    titleClosed: "Скрыть фильтр",
                }}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filterWrapper}>
                            <Flex className={classes.filterSearchAndSelects}>
                                <FSearch name="query" placeholder="Поиск" size="sm" className={classes.filterSearch} />
                                <FSelect
                                    name="categoryIds"
                                    label="Категория"
                                    data={prepareOptionsForSelect({
                                        data: fileResources.data?.categories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    size="sm"
                                    className={classes.filterSelect}
                                    clearable
                                    disabled={fileResources.isLoading || !fileResources.data?.categories.length}
                                />
                                <FSelect
                                    name="type"
                                    label="Тип файла"
                                    data={prepareOptionsForSelect({
                                        data: fileResources.data?.types,
                                        value: "type",
                                        label: "name",
                                    })}
                                    size="sm"
                                    className={classes.filterSelect}
                                    clearable
                                    disabled={fileResources.isLoading || !fileResources.data?.types.length}
                                />
                                <FDateRangePicker
                                    name="createdAtFrom"
                                    nameTo="createdAtTo"
                                    label="Дата создания"
                                    size="sm"
                                    className={classes.filterDateRangePicker}
                                    clearable
                                />
                            </Flex>
                            <Flex gap={16}>
                                <Button w={164} type="submit" disabled={!dirty}>
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
            <Flex justify="space-between" mt={14} gap={8}>
                <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
                    Отмена
                </Button>
                <Button variant="secondary" size="large" w="100%" maw={252} onClick={handleSubmit} disabled={!selected}>
                    Добавить
                </Button>
            </Flex>
        </Box>
    );
};

export default AddMaterialsToArticleModal;
