import React from "react";
import { Box, Flex, Grid, Title } from "@mantine/core";
import { FormikConfig } from "formik";
import { useListState } from "@mantine/hooks";
import { FButton, FInput, Form, FResetButton, ManagedDataGrid } from "@shared/ui";
import { TUser } from "./types";
import { columns, users as data } from "./constant";
export enum QueryKeys {
    GET_OFFERS = "GET_OFFERS",
}
export default function UiKitPage() {
    const [users, handlers] = useListState<TUser>(data);

    const cfg: FormikConfig<TUser> = {
        initialValues: {
            id: 0,
            fio: "",
            email: "",
            role: "",
            status: "",
        },
        onSubmit: async (values, _helpers) => {
            return new Promise((resolve) => {
                return setTimeout(() => {
                    resolve(handlers.append(values));
                }, 1000);
            });
        },
    };

    return (
        <Box style={{ width: "50%" }}>
            <Title>Test Montserrat</Title>
            <Form<TUser> config={cfg} persist>
                <Grid>
                    <Grid.Col span={6}>
                        <FInput name="fio" label="Имя" placeholder="Имя" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FInput name="email" label="Email" placeholder="Email" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FInput name="role" label="Пароль" placeholder="Пароль" />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <FInput name="status" label="Описание" placeholder="Описание" />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Flex justify="space-between">
                            <FResetButton>Сбросить</FResetButton>
                            <FButton type="submit">Подтвердить </FButton>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Form>
            <ManagedDataGrid<TUser>
                queryKey={QueryKeys.GET_OFFERS}
                getData={() =>
                    new Promise((resolve) =>
                        resolve({
                            data: users,
                            pagination: {
                                count: users.length,
                                currentPage: 0,
                                perPage: 10,
                                total: users.length,
                                totalPages: 1,
                            },
                        })
                    )
                }
                columns={columns}>
                <div>23123123213123</div>
            </ManagedDataGrid>
        </Box>
    );
}
