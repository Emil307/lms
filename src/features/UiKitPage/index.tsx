import React from "react";
import { Box, Flex, Grid, Title } from "@mantine/core";
import { FormikConfig } from "formik";
import { DataGrid } from "mantine-data-grid";
import { useListState } from "@mantine/hooks";
import { FInput } from "src/ui/Forms/Input";
import { Form } from "src/ui/Forms/Form";
import { FButton, FResetButton } from "src/ui/Forms/Button";
import { TUser } from "./types";
import { columns } from "./constant";
import { uiKitApi } from "./api";

export default function UiKitPage(): JSX.Element {
    const [users, handlers] = useListState<TUser>([]);

    const cfg: FormikConfig<TUser> = {
        initialValues: {
            description: "",
            email: "",
            name: "",
            password: "",
        },
        onSubmit: async (values, _helpers) => {
            const parsed = await uiKitApi.getTestData();

            return new Promise((resolve) => {
                return setTimeout(() => {
                    resolve(parsed);
                    handlers.append(values);
                }, 2000);
            });
        },
    };

    return (
        <Box style={{ width: "50%" }}>
            <Title>Test Montserrat</Title>
            <Form<TUser> config={cfg} persist>
                <Grid>
                    <Grid.Col span={6}>
                        <FInput name="name" label="Имя" placeholder="Имя" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FInput name="email" label="Email" placeholder="Email" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FInput name="password" label="Пароль" placeholder="Пароль" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FInput name="description" label="Описание" placeholder="Описание" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Flex justify="space-between">
                            <FResetButton>Сбросить</FResetButton>
                            <FButton type="submit">Подтвердить </FButton>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Form>
            <DataGrid columns={columns} data={users} />
        </Box>
    );
}
