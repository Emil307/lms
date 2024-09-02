import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { StudentDetailsPage } from "@pages/admin/students";
import { AdminPage } from "@components/AdminPage";
import { getFullName, NextPageWithLayout } from "@shared/utils";
import { NextPageWithLayoutProps, Roles } from "@shared/types";
import { useDetailsUser } from "@entities/user";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const StudentDetails: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useDetailsUser(id as string);

    useEffect(() => {
        if (data) {
            const rolesIds = data.roles.map(({ name }) => name);
            if (!rolesIds.includes(Roles.student)) {
                router.replace(`/admin/users/${id}`);
            }
        }
    }, [data, router, id]);

    const userFullName = data ? getFullName({ data: data.profile }) : "Loading...";

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={userFullName}>
            <StudentDetailsPage />
        </AdminPage>
    );
};

StudentDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default StudentDetails;
