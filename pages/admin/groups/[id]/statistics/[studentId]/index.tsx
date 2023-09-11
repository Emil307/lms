import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { GroupApi } from "@entities/group";
import { QueryKeys } from "@shared/constant";
import { GroupStudentStatisticsPage } from "@pages/admin/groups";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const groupApi = new GroupApi(axios);

    try {
        const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_GROUP, id], () => groupApi.getAdminGroup({ id }));

        return {
            props: {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                title: response.name,
            },
        };
    } catch (error) {
        return handleAxiosErrorSsr(error);
    }
}

const GroupStudentStatisticsDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <GroupStudentStatisticsPage />
        </AdminPage>
    );
};

GroupStudentStatisticsDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default GroupStudentStatisticsDetails;
