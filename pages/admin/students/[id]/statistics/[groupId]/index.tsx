import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { QueryKeys } from "@shared/constant";
import { UserApi } from "@entities/user";
import { getFullName } from "@shared/utils";
import { StudentStatisticsPage } from "@pages/admin/students";
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
                    destination: `/admin/users/${id}`,
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

const StudentStatisticsDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <StudentStatisticsPage />
        </AdminPage>
    );
};

StudentStatisticsDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default StudentStatisticsDetails;
