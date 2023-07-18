import { Collapse, Flex, ThemeIcon } from "@mantine/core";
import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { FDateRangePicker, FSearch, FSelect, ManagedDataGrid } from "@shared/ui";
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
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Материалов"
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}>
                <>
                    <Button variant="text" onClick={handleToggleVisibilityFilters} rightIcon={renderIconToggleButton()}>
                        {labelToggleButton}
                    </Button>
                    <Collapse in={openedFilters} mt={16}>
                        <Flex columnGap={8} rowGap={0}>
                            <FSearch w={380} size="sm" name="query" placeholder="Поиск" />
                            <FSelect
                                name="categoryIds"
                                size="sm"
                                data={categoriesOptions}
                                clearable
                                label="Категория"
                                disabled={isLoadingResources}
                            />
                            <FSelect name="type" size="sm" data={typesOptions} clearable label="Тип файла" disabled={isLoadingResources} />
                            <FDateRangePicker
                                name="createdAtFrom"
                                nameTo="createdAtTo"
                                label="Дата создания"
                                size="sm"
                                clearable
                                maw={210}
                            />
                        </Flex>
                        <Flex gap={16} mt={16}>
                            <Button type="submit" w="100%" maw={164}>
                                Найти
                            </Button>
                        </Flex>
                    </Collapse>
                </>
            </ManagedDataGrid>
            <Flex justify="space-between" mt={14} gap={8}>
                <Button variant="border" size="large" onClick={onClose} w="100%" maw={252} disabled={isLoadingAttach}>
                    Отмена
                </Button>
                <Button
                    variant="secondary"
                    size="large"
                    w="100%"
                    maw={252}
                    onClick={handleSubmit}
                    loading={isLoadingAttach}
                    disabled={!selected.length}>
                    Добавить
                </Button>
            </Flex>
        </>
    );
};

export default AddMaterialsToLessonModal;
