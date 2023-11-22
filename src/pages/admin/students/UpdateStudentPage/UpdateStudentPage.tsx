import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { UpdateStudentForm } from "@features/students";
import { useDetailsUser } from "@entities/user";
import { getFullName } from "@shared/utils";
import { getBreadCrumbsItems } from "./utils";

const UpdateStudentPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const { data: userData } = useDetailsUser(id);

    const userName = getFullName({ data: userData?.profile });

    const handleCloseForm = () => {
        router.push({ pathname: "/admin/students/[id]", query: { id } });
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ userName })} mb={8} />
            <Heading mb={24}>{userName}</Heading>
            <UpdateStudentForm data={userData} onClose={handleCloseForm} />
        </Box>
    );
};

export default UpdateStudentPage;
