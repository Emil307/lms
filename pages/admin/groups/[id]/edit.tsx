import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { UpdateGroupPage } from "@pages/admin/groups";
import { AdminPage } from "@components/AdminPage";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { GroupApi } from "@entities/group";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const groupApi = new GroupApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [QueryKeys.GET_ADMIN_GROUP, [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER, EntityNames.STUDENT], id],
            () => groupApi.getAdminGroup({ id })
        );

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

const UpdateGroup: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <UpdateGroupPage />
        </AdminPage>
    );
};

UpdateGroup.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateGroup;
