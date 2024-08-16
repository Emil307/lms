import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayoutProps } from "@shared/types";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { GroupStudentStatisticsPage } from "@pages/admin/groups";
import { useAdminGroup } from "@entities/group";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const GroupStudentStatisticsDetails: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useAdminGroup(id ? { id: id as string } : { id: "" });

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={data.name}>
            <GroupStudentStatisticsPage />
        </AdminPage>
    );
};

GroupStudentStatisticsDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default GroupStudentStatisticsDetails;
