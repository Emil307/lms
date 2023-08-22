import { Collapse, Flex, ThemeIcon } from "@mantine/core";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Button, FDateRangePicker, FSearch, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { useAttachLessonToCourseModule } from "@entities/courseModule";
import { AdminLessonFromList, AdminSelectLessonsExtraFilters, AdminSelectLessonsFilters, lessonApi } from "@entities/lesson";
import { adaptGetAdminLessonsRequest } from "@features/lessons/ui/LessonListModal/utils";
import { useMedia } from "@shared/utils";
import { columns, filterInitialValues } from "./constants";
import useStyles from "./LessonListModal.styles";

export interface LessonListModalProps {
    courseId: string;
    moduleId: string;
    moduleName: string;
    onClose: () => void;
}

const LessonListModal = ({ courseId, moduleId, moduleName, onClose }: LessonListModalProps) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    const isMobile = useMedia("sm");

    const { mutate: attachLessonsToModule, isLoading } = useAttachLessonToCourseModule({ courseId, moduleId, moduleName });

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
                queryCacheKeys={["page", "perPage", "sort", "query", "createdAtFrom", "createdAtTo", "courseIds"]}
                filter={{
                    initialValues: filterInitialValues,
                }}
                extraFilterParams={{ courseIds: [courseId] }}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Уроков"
                initialState={{
                    columnOrder: ["mrt-row-select", "id", "name", "description", "createdAt", "isActive"],
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
                                    <FSearch className={classes.filterSearch} name="query" size="sm" placeholder="Поиск" />
                                    <FDateRangePicker
                                        className={classes.filterDateRangePicker}
                                        name="createdAtFrom"
                                        nameTo="createdAtTo"
                                        label="Дата создания"
                                        size="sm"
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
            <Flex justify="space-between" mt={24} gap={8}>
                <Button variant="border" size={isMobile ? "medium" : "large"} onClick={onClose} w="100%" maw={252} disabled={isLoading}>
                    Отмена
                </Button>
                <Button
                    variant="secondary"
                    size={isMobile ? "medium" : "large"}
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
