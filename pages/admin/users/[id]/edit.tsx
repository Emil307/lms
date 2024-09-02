import React, { useEffect } from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { UpdateUserPage } from "@pages/admin/users";
import { getFullName, NextPageWithLayout } from "@shared/utils";
import { NextPageWithLayoutProps, Roles } from "@shared/types";
import { useDetailsUser } from "@entities/user";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const UpdateUser: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useDetailsUser(id as string);

    useEffect(() => {
        if (data) {
            const rolesIds = data.roles.map(({ name }) => name);
            if (!rolesIds.includes(Roles.administrator) && !rolesIds.includes(Roles.manager) && !rolesIds.includes(Roles.teacher)) {
                router.replace(`/admin/students/${id}/edit`);
            }
        }
    }, [data, router, id]);

    const userFullName = data ? getFullName({ data: data.profile }) : "Loading...";

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={userFullName}>
            <UpdateUserPage />
        </AdminPage>
    );
};

UpdateUser.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateUser;
