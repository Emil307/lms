import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateAuthorPage } from "@pages/admin/settings";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { getFullName } from "@shared/utils";
import { AuthorApi } from "@entities/author";
import { QueryKeys } from "@shared/constant";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const { id } = context.params as GetServerSidePropsContextParams;
//
//     const { axios, queryClient } = await getSsrInstances(context);
//
//     const authorApi = new AuthorApi(axios);
//
//     try {
//         const response = await queryClient.fetchQuery([QueryKeys.GET_ADMIN_AUTHOR, id], () => authorApi.getAdminAuthor({ id }));
//
//         const fullName = getFullName({ data: response });
//
//         return {
//             props: {
//                 dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//                 title: fullName,
//             },
//         };
//     } catch (error) {
//         return handleAxiosErrorSsr(error);
//     }
// }

const UpdateAuthor: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <AdminPage title={title}>
            <UpdateAuthorPage />
        </AdminPage>
    );
};

UpdateAuthor.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateAuthor;
