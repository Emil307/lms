import React, { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { MyArticleDetailsPage } from "@pages/articles";
import { ArticleTypes, EntityNames, QueryKeys } from "@shared/constant";
import { ArticleApi } from "@entities/article";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { GetServerSidePropsContextParams, NextPageWithLayoutProps } from "@shared/types";
import { UserPage } from "@components/UserPage";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = getSsrInstances(context);

    const articleApi = new ArticleApi(axios);

    try {
        const response = await queryClient.fetchQuery(
            [
                QueryKeys.GET_ARTICLE,
                [EntityNames.ARTICLE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.MATERIAL],
                ArticleTypes.MY_ARTICLE,
                id,
            ],
            () => articleApi.getMyArticle({ id })
        );

        if (!response.data.isAvailable) {
            return {
                redirect: {
                    destination: "/articles?tab=my-articles",
                    permanent: false,
                },
            };
        }

        return {
            props: {
                dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
                title: response.data.name,
            },
        };
    } catch (error) {
        return handleAxiosErrorSsr(error);
    }
}

const MyArticleDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <UserPage title={title}>
            <MyArticleDetailsPage />
        </UserPage>
    );
};

MyArticleDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default MyArticleDetails;
