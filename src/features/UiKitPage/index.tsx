import React from "react";
import {Box, Flex, Grid} from "@mantine/core";
import {FormikConfig} from "formik";
import {DataGrid} from "mantine-data-grid";
import {useListState} from "@mantine/hooks";
import {FInput} from "src/ui/Forms/Input";
import {Form} from "src/ui/Forms/Form";
import {FButton, FResetButton} from "src/ui/Forms/Button";
import {TUser} from "./types";
import {columns} from "./constant";

export default function UiKitPage() {
    const [users, handlers] = useListState<TUser>([]);

    const cfg: FormikConfig<TUser> = {
        initialValues: {
            description: "",
            email: "",
            name: "",
            password: "",
        },
        onSubmit: async (values, _helpers) => {
            return new Promise((resolve) => {
                return setTimeout(() => {
                    resolve(handlers.append(values));
                }, 2000);
            });
        },
    };

    return (
        <Box style={{width: "50%"}}>
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
