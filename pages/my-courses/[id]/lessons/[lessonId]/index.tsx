import React from "react";
import { useRouter } from "next/router";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { LessonDetailsPage } from "@pages/lessons";
import { useLesson } from "@entities/lesson";
import { useGroup } from "@entities/group";
import { UserPage } from "@components/UserPage";

type TRouterQueries = {
    lessonId: string;
    id: string;
};

const LessonDetails: NextPageWithLayout = () => {
    const router = useRouter();
    const { lessonId, id: groupId } = router.query as TRouterQueries;

    const group = useGroup({ id: groupId });

    const lesson = useLesson({
        id: lessonId,
        courseId: group.data?.courseId,
        groupId: group.data?.groupId,
        groupStatus: group.data?.status.name,
    });

    return (
        <UserLayout>
            <UserPage title={lesson.data?.name}>
                <LessonDetailsPage />
            </UserPage>
        </UserLayout>
    );
};

export default LessonDetails;
