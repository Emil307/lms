import { Box, Collapse, Flex, Group, ThemeIcon } from "@mantine/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Button, FSearch, FSelect, ManagedDataGrid, prepareOptionsForSelect } from "@shared/ui";
import {
    AdminArticleFromArticlePackageExtraFilters,
    AdminArticleFromArticlePackageFiltersForm,
    AdminArticleFromList,
    articleApi,
    useAdminArticleFilters,
} from "@entities/article";
import { QueryKeys } from "@shared/constant";
import { useAttachArticleToArticlePackage } from "@entities/articlePackage";
import { columnOrder, columns, filterInitialValues } from "./constants";
import useStyles from "./AddArticleToArticlePackageModal.styles";
import { adaptGetAdminArticlesRequest } from "./utils";

export interface AddArticleToArticlePackageModalProps {
    articlePackageId: string;
    onClose: () => void;
}

const AddArticleToArticlePackageModal = ({ articlePackageId, onClose }: AddArticleToArticlePackageModalProps) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const courseResources = useAdminArticleFilters();
    const attachArticleToPackage = useAttachArticleToArticlePackage(articlePackageId);

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
        attachArticleToPackage.mutate(
            { articleIds: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Box>
            <ManagedDataGrid<AdminArticleFromList, AdminArticleFromArticlePackageFiltersForm, AdminArticleFromArticlePackageExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_ARTICLES}
                queryFunction={(params) => articleApi.getAdminArticles(adaptGetAdminArticlesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "categoryId", "subcategoryId", "articlePackageIds"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Курсов"
                extraFilterParams={{ articlePackageIds: articlePackageId }}
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}>
                {({ dirty }) => {
                    return (
                        <Box>
                            <Button variant="text" onClick={handleToggleVisibilityFilters} rightIcon={renderIconToggleButton()}>
                                {labelToggleButton}
                            </Button>
                            <Collapse in={openedFilters} mt={16}>
                                <Group sx={{ gap: 8, alignItems: "flex-start" }}>
                                    <FSearch w="100%" maw={428} size="sm" name="query" placeholder="Поиск" />
                                    <FSelect
                                        name="categoryId"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: courseResources.data?.categories,
                                            value: "id",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Категория"
                                        disabled={courseResources.isLoading}
                                        w="100%"
                                        maw={210}
                                    />
                                    <FSelect
                                        name="subcategoryId"
                                        size="sm"
                                        data={prepareOptionsForSelect({
                                            data: courseResources.data?.subcategories,
                                            value: "id",
                                            label: "name",
                                        })}
                                        clearable
                                        label="Подкатегория"
                                        disabled={courseResources.isLoading}
                                        w="100%"
                                        maw={210}
                                    />
                                </Group>
                                <Button mt={16} type="submit" w="100%" maw={164} disabled={!dirty}>
                                    Найти
                                </Button>
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

export default AddArticleToArticlePackageModal;
