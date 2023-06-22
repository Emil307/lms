import { Collapse, Flex, ThemeIcon } from "@mantine/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Button, FDateRangePicker, FSearch, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { useAttachLessonToCourseModule } from "@entities/courseModule";
import { AdminLessonFromList, AdminSelectLessonsExtraFilters, AdminSelectLessonsFilters, lessonApi } from "@entities/lesson";
import { adaptGetAdminLessonsRequest } from "@features/lessons/ui/LessonListModal/utils";
import { columns, filterInitialValues } from "./constants";
import useStyles from "./LessonListModal.styles";

export interface LessonListModalProps {
    courseId: string;
    moduleId: string;
    onClose: () => void;
}

const LessonListModal = ({ courseId, moduleId, onClose }: LessonListModalProps) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const { mutate: attachLessonsToModule, isLoading } = useAttachLessonToCourseModule({ courseId, moduleId });

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
        attachLessonsToModule(selected, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <>
            <ManagedDataGrid<AdminLessonFromList, AdminSelectLessonsFilters, AdminSelectLessonsExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_LESSONS_FOR_SELECT}
                queryFunction={(params) => lessonApi.getAdminLessons(adaptGetAdminLessonsRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "query", "createdAtFrom", "createdAtTo", "moduleIds"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                extraFilterParams={{ moduleIds: [moduleId] }}
                renderActiveBadge={(cell) => cell.row.original.isActive}
                columns={columns}
                countName="Уроков"
                initialState={{
                    columnOrder: ["mrt-row-select", "id", "name", "description", "createdAt", "isActive"],
                }}
                disableQueryParams
                onChangeSelect={setSelected}>
                <>
                    <Button variant="text" onClick={handleToggleVisibilityFilters} rightIcon={renderIconToggleButton()}>
                        {labelToggleButton}
                    </Button>
                    <Collapse in={openedFilters} mt={16}>
                        <Flex gap={8}>
                            <FSearch name="query" w="100%" size="sm" placeholder="Поиск" />
                            <FDateRangePicker name="createdAtFrom" nameTo="createdAtTo" label="Дата создания" size="sm" miw={210} />
                        </Flex>
                        <Button mt={16} type="submit" w="100%" maw={164}>
                            Найти
                        </Button>
                    </Collapse>
                </>
            </ManagedDataGrid>
            <Flex justify="space-between" mt={14} gap={8}>
                <Button variant="border" size="large" onClick={onClose} w="100%" maw={252} disabled={isLoading}>
                    Отмена
                </Button>
                <Button
                    variant="secondary"
                    size="large"
                    w="100%"
                    maw={252}
                    onClick={handleSubmit}
                    loading={isLoading}
                    disabled={!selected.length}>
                    Добавить
                </Button>
            </Flex>
        </>
    );
};

export default LessonListModal;
