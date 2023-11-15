import { Collapse, Flex, ThemeIcon } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { ControlButtons, FDateRangePicker, FSearch, FSelect, ManagedDataGrid } from "@shared/ui";
import { Button } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import {
    UploadedFileFromList,
    storageApi,
    useUploadedFileResources,
    AdminMaterialsNoIncludedLessonFiltersForm,
    AdminMaterialsNoIncludedLessonExtraFilters,
} from "@entities/storage";
import { useAttachMaterialsToLesson } from "@entities/lesson";
import { columnOrder, columns, filterInitialValues } from "./constants";
import { adaptGetMaterialsNoIncludedLessonRequest } from "./utils";
import useStyles from "./AddMaterialsToLessonModal.styles";

interface AddMaterialsToLessonModalProps {
    lessonId: string;
    onClose: () => void;
}

const AddMaterialsToLessonModal = ({ lessonId, onClose }: AddMaterialsToLessonModalProps) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const { data: materialResources, isLoading: isLoadingResources } = useUploadedFileResources();
    const { mutate: attachMaterialsToLesson, isLoading: isLoadingAttach } = useAttachMaterialsToLesson({ lessonId });

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

    const categoriesOptions = useMemo(() => {
        if (!materialResources) {
            return [];
        }
        return materialResources.categories.map((item) => ({
            value: String(item.id),
            label: item.name,
        }));
    }, [materialResources]);

    const typesOptions = useMemo(() => {
        if (!materialResources) {
            return [];
        }
        return materialResources.types.map((item) => ({
            value: item.type,
            label: item.name,
        }));
    }, [materialResources]);

    const handleSubmit = () => {
        attachMaterialsToLesson(selected, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <>
            <ManagedDataGrid<UploadedFileFromList, AdminMaterialsNoIncludedLessonFiltersForm, AdminMaterialsNoIncludedLessonExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_LESSON_MATERIALS_FOR_SELECT}
                queryFunction={(params) => storageApi.getUploadedFiles(adaptGetMaterialsNoIncludedLessonRequest(params))}
                queryCacheKeys={["lessonId", "page", "perPage", "sort", "query", "type", "createdAtFrom", "createdAtTo", "categoryIds"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                extraFilterParams={{ lessonId }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Материалов"
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
                        <>
                            <Button variant="text" onClick={handleToggleVisibilityFilters} rightIcon={renderIconToggleButton()}>
                                {labelToggleButton}
                            </Button>
                            <Collapse in={openedFilters} mt={16}>
                                <Flex className={classes.filter}>
                                    <FSearch
                                        className={classes.filterSearch}
                                        size="sm"
                                        name="query"
                                        placeholder="Поиск"
                                        disabled={isLoadingResources}
                                    />
                                    <FSelect
                                        className={classes.filterSelect}
                                        name="categoryIds"
                                        size="sm"
                                        data={categoriesOptions}
                                        clearable
                                        label="Категория"
                                        disabled={isLoadingResources}
                                    />
                                    <FSelect
                                        className={classes.filterSelect}
                                        name="type"
                                        size="sm"
                                        data={typesOptions}
                                        clearable
                                        label="Тип файла"
                                        disabled={isLoadingResources}
                                    />
                                    <FDateRangePicker
                                        className={classes.filterDateRangePicker}
                                        name="createdAtFrom"
                                        nameTo="createdAtTo"
                                        label="Дата создания"
                                        size="sm"
                                        clearable
                                        disabled={isLoadingResources}
                                    />
                                </Flex>
                                <Flex gap={16} mt={16}>
                                    <Button type="submit" w={164}>
                                        Найти
                                    </Button>
                                    {dirty && (
                                        <Button type="button" variant="white" onClick={handleResetForm} w={164}>
                                            Cбросить
                                        </Button>
                                    )}
                                </Flex>
                            </Collapse>
                        </>
                    );
                }}
            </ManagedDataGrid>

            <ControlButtons
                variant="modalTable"
                cancelButtonText="Отмена"
                submitButtonText="Добавить"
                onClose={onClose}
                onSubmit={handleSubmit}
                isLoading={isLoadingAttach}
                disabledSubmit={!selected.length}
                mt={24}
            />
        </>
    );
};

export default AddMaterialsToLessonModal;
