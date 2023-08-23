import { Box, BoxProps, Flex } from "@mantine/core";
import React, { useState } from "react";
import { Button, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { useAttachCoursesToStudent } from "@entities/course";
import { AdminArticlePackageFromList, articlePackageApi } from "@entities/articlePackage";
import { columnOrder, columns } from "./constants";
import { adaptGetAdminArticlePackagesRequest } from "./utils";
import { StudentArticlePackageListExtraParams } from "./types";

export interface AddArticlePackagesToStudentModalProps extends Omit<BoxProps, "children"> {
    studentId: string;
    onClose: () => void;
}

const AddArticlePackagesToStudentModal = ({ studentId, onClose, ...props }: AddArticlePackagesToStudentModalProps) => {
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
            <ManagedDataGrid<AdminArticlePackageFromList, unknown, StudentArticlePackageListExtraParams>
                queryKey={QueryKeys.GET_ADMIN_NO_ARTICLE_COURSES}
                queryFunction={(params) => articlePackageApi.getAdminArticlePackages(adaptGetAdminArticlePackagesRequest(params))}
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

export default AddArticlePackagesToStudentModal;
