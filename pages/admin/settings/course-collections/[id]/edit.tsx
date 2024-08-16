import React from "react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@app/layouts";
import { AdminPage } from "@components/AdminPage";
import { UpdateCourseCollectionPage } from "@pages/admin/settings";
import { NextPageWithLayout } from "@shared/utils/types";
import { NextPageWithLayoutProps } from "@shared/types";
import { useAdminCourseCollection } from "@entities/courseCollection";
import { Loader } from "@shared/ui";
import { CustomPage500 } from "@pages/errors";

const UpdateCourseCollection: NextPageWithLayout<NextPageWithLayoutProps> = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, error } = useAdminCourseCollection(id ? { id: id as string } : { id: "" });

    if (isLoading) return <Loader />;
    if (error) return <CustomPage500 />;

    return (
        <AdminPage title={data.name}>
            <UpdateCourseCollectionPage />
        </AdminPage>
    );
};

UpdateCourseCollection.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateCourseCollection;
