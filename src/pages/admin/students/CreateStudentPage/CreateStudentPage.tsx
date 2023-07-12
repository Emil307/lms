import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateStudentForm } from "@features/students";
import { breadCrumbsItems } from "./constants";

const CreateStudentPage = () => {
    const router = useRouter();

    const handleCloseForm = () => router.push("/admin/students");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Heading>Создание ученика</Heading>
            <CreateStudentForm onClose={handleCloseForm} />
        </Box>
    );
};

export default CreateStudentPage;
