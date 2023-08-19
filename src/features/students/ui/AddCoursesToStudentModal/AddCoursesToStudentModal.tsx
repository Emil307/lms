import { Box, BoxProps, Flex } from "@mantine/core";
import React, { useState } from "react";
import { Button, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminCourseFromList, AdminStudentCoursesExtraFilters, courseApi } from "@entities/course";
import { useAttachCoursesToStudent } from "@entities/user";
import { columnOrder, columns } from "./constants";
import { adaptGetAdminCoursesRequest } from "./utils";

export interface AddCoursesToStudentModalProps extends Omit<BoxProps, "children"> {
    studentId: string;
    onClose: () => void;
}

const AddCoursesToStudentModal = ({ studentId, onClose, ...props }: AddCoursesToStudentModalProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const attachCoursesToStudent = useAttachCoursesToStudent({ studentId });

    const handleSubmit = () => {
        attachCoursesToStudent.mutate(
            { ids: selected },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Box {...props}>
            <ManagedDataGrid<AdminCourseFromList, unknown, AdminStudentCoursesExtraFilters>
                queryKey={QueryKeys.GET_ADMIN_NO_ARTICLE_COURSES}
                queryFunction={(params) => courseApi.getAdminCourses(adaptGetAdminCoursesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "studentId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Курсов"
                extraFilterParams={{ studentId }}
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}
            />
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

export default AddCoursesToStudentModal;
