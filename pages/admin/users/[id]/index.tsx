import React, { useEffect } from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { UserDetailsPage } from "@pages/admin/users";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { getFullName, NextPageWithLayout } from "@shared/utils";
import { NextPageWithLayoutProps } from "@shared/types";
import { Roles } from "@app/routes";
import { useDetailsUser } from "@entities/user";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const UserDetails: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useDetailsUser(id as string);

    useEffect(() => {
        if (data) {
            const rolesIds = data.roles.map(({ id }) => id);
            if (!rolesIds.includes(Roles.administrator) && !rolesIds.includes(Roles.manager) && !rolesIds.includes(Roles.teacher)) {
                router.replace(`/admin/students/${id}`);
            }
        }
    }, [data, router, id]);

    const userFullName = data ? getFullName({ data: data.profile }) : "Loading...";

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={userFullName}>
            <UserDetailsPage />
        </AdminPage>
    );
};

UserDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UserDetails;
