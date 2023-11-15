import { Box, BoxProps } from "@mantine/core";
import React, { useState } from "react";
import { ControlButtons, ManagedDataGrid } from "@shared/ui";
import { QueryKeys } from "@shared/constant";
import { AdminArticlePackageFromList, articlePackageApi, useAttachArticlePackagesToStudent } from "@entities/articlePackage";
import { columnOrder, columns } from "./constants";
import { adaptGetAdminArticlePackagesRequest } from "./utils";
import { StudentArticlePackageListExtraParams } from "./types";

export interface AddArticlePackagesToStudentModalProps extends Omit<BoxProps, "children"> {
    studentId: string;
    onClose: () => void;
}

const AddArticlePackagesToStudentModal = ({ studentId, onClose, ...props }: AddArticlePackagesToStudentModalProps) => {
    const [selected, setSelected] = useState<string[]>([]);

    const attachArticlePackagesToStudent = useAttachArticlePackagesToStudent({ studentId });

    const handleSubmit = () => {
        attachArticlePackagesToStudent.mutate(
            { articlePackageIds: selected },
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
                queryKey={QueryKeys.GET_ADMIN_NO_STUDENT_ARTICLE_PACKAGES}
                queryFunction={(params) => articlePackageApi.getAdminArticlePackages(adaptGetAdminArticlePackagesRequest(params))}
                queryCacheKeys={["page", "perPage", "sort", "studentId"]}
                renderBadge={(cell) => [{ condition: cell.row.original.isActive }]}
                columns={columns}
                countName="Пакетов"
                extraFilterParams={{ studentId }}
                initialState={{
                    columnOrder,
                }}
                disableQueryParams
                onChangeSelect={setSelected}
            />
            <ControlButtons
                variant="modalTable"
                cancelButtonText="Отмена"
                submitButtonText="Добавить"
                onClose={onClose}
                onSubmit={handleSubmit}
                disabledSubmit={!selected.length}
                mt={14}
            />
        </Box>
    );
};

export default AddArticlePackagesToStudentModal;
