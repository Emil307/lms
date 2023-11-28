import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { UpdateStudentPage } from "@pages/admin/students";
import { AdminPage } from "@components/AdminPage";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { UserApi } from "@entities/user";
import { QueryKeys } from "@shared/constant";
import { getFullName } from "@shared/utils";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { Roles } from "@app/routes";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const userApi = new UserApi(axios);

    try {
        const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_USER, id], () => userApi.showUser(id));

        const rolesIds = response.roles.map(({ id }) => id);

        //TODO: тк у нас один рут для получения всех пользователей
        if (!rolesIds.includes(Roles.student) && !rolesIds.includes(Roles.employee)) {
            return {
                redirect: {
                    destination: `/admin/users/${id}/edit`,
                    permanent: false,
                },
            };
        }

        const userFullName = getFullName({ data: response.profile });

        return {
            props: {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                title: userFullName,
            },
        };
    } catch (error) {
        return handleAxiosErrorSsr(error);
    }
}

const UpdateStudent: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <UpdateStudentPage />
        </AdminPage>
    );
};

UpdateStudent.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateStudent;
