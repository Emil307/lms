import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserDetailsPage } from "@pages/admin/users";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { getSsrInstances } from "@app/config/ssr";
import { UserApi } from "@entities/user";
import { QueryKeys } from "@shared/constant";
import { getFullName } from "@shared/utils";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";

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

const UserDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <UserDetailsPage />
        </AdminPage>
    );
};

UserDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UserDetails;
