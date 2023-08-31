import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { getSsrInstances } from "@app/config/ssr";
import { QueryKeys } from "@shared/constant";
import {UserApi} from "@entities/user";
import {getFullName} from "@shared/utils";
import {StudentStatisticsPage} from "@pages/admin/students";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const userApi = new UserApi(axios);

    const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_USER, id], () => userApi.showUser(id));

    const userFullName = getFullName({ data: response.profile });

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            title: userFullName,
        },
    };
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
