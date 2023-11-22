import React from "react";
import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { dehydrate } from "@tanstack/react-query";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { ArticleByCategoryDetailsPage } from "@pages/articles";
import { getSsrInstances, handleAxiosErrorSsr } from "@app/config/ssr";
import { ArticleTypes, QueryKeys } from "@shared/constant";
import { ArticleApi } from "@entities/article";
import { NextPageWithLayoutProps } from "@shared/types";
import { UserPage } from "@components/UserPage";

type GetServerSidePropsContextParams = {
    id: string;
    categoryId: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id, categoryId } = context.params as GetServerSidePropsContextParams;

    const { axios, queryClient } = await getSsrInstances(context);

    const articleApi = new ArticleApi(axios);

    try {
        const response = await queryClient.fetchQuery([QueryKeys.GET_ARTICLE, ArticleTypes.BY_CATEGORY, id], () =>
            articleApi.getArticleByCategory({ id, categoryId })
        );

        if (!response.data.isAvailable) {
            return {
                redirect: {
                    destination: `/articles?tab=all&categoryId=${categoryId}`,
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

const ArticleByCategoryDetails: NextPageWithLayout<NextPageWithLayoutProps> = ({ title }) => {
    return (
        <UserPage title={title}>
            <ArticleByCategoryDetailsPage />
        </UserPage>
    );
};

ArticleByCategoryDetails.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default ArticleByCategoryDetails;
