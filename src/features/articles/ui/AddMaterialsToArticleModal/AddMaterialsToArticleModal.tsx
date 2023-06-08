import { Box, Collapse, Flex, Group, ThemeIcon } from "@mantine/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
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

export interface AddMaterialsToArticleModalProps {
    articleId: string;
    onClose: () => void;
}

const AddMaterialsToArticleModal = ({ articleId, onClose }: AddMaterialsToArticleModalProps) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const fileResources = useUploadedFileResources();
    const attachMaterialsToArticle = useAttachMaterialFilesToArticle(articleId);

    const handleToggleVisibilityFilters = () => setOpenedFilters((prevState) => !prevState);

    const renderIconToggleButton = () => {
        if (openedFilters) {
            return (
                <ThemeIcon className={classes.iconToggle}>
                    <ChevronUp />
                </ThemeIcon>
            );
        }
        return (
            <ThemeIcon className={classes.iconToggle}>
                <ChevronDown />
            </ThemeIcon>
        );
    };

    const labelToggleButton = openedFilters ? "Скрыть фильтр" : "Показать фильтр";

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
        <Box>
            <ManagedDataGrid<UploadedFileFromList, AdminMaterialsNoIncludedArticleFiltersForm, AdminArticleMaterialsExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_NO_ARTICLE_MATERIALS}
                queryFunction={(params) => storageApi.getUploadedFiles(adaptGetMaterialsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "categoryIds", "type", "createdAtFrom", "createdAtTo", "articleId"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Материалов"
                extraFilterParams={{ articleId: articleId }}
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: filterInitialValues });
                        handleSubmit();
                    };

                    return (
                        <Box>
                            <Button variant="text" onClick={handleToggleVisibilityFilters} rightIcon={renderIconToggleButton()}>
                                {labelToggleButton}
                            </Button>
                            <Collapse in={openedFilters} mt={16}>
                                <Group sx={{ gap: 8, alignItems: "flex-start" }}>
                                    <FSearch w="100%" maw={210} size="sm" name="query" placeholder="Поиск" />
                                    <FSelect
                                        name="categoryIds"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: fileResources.data?.categories,
                                            value: "id",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Категория"
                                        disabled={fileResources.isLoading}
                                        w="100%"
                                        maw={210}
                                    />
                                    <FSelect
                                        name="type"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: fileResources.data?.types,
                                            value: "type",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Тип"
                                        disabled={fileResources.isLoading}
                                        w="100%"
                                        maw={210}
                                    />
                                    <FDateRangePicker
                                        name="createdAtFrom"
                                        nameTo="createdAtTo"
                                        label="Дата создания"
                                        size="sm"
                                        clearable
                                        maw={210}
                                    />
                                </Group>
                                <Group>
                                    <Button mt={16} type="submit" w="100%" maw={164} disabled={!dirty}>
                                        Найти
                                    </Button>
                                    {dirty && (
                                        <Button mt={16} variant="white" w="100%" maw={164} onClick={handleResetForm}>
                                            Сбросить
                                        </Button>
                                    )}
                                </Group>
                            </Collapse>
                        </Box>
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
