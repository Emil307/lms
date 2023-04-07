import { Avatar, Flex, Group, Text, useMantineTheme } from "@mantine/core";
import { FormikConfig } from "formik";
import { Edit3, Shield, User as UserIcon } from "react-feather";
import axios from "axios";
import AvatarIcon from "public/icons/avatar.svg";
import { Button, FFileButton, FInput, Form } from "@shared/ui";
import { adaptDataForProfileEditForm, initialValuesProfileEditForm } from "@features/editProfile";
import { $updateMeRequest, User, UpdateMeRequest, useUpdateMe } from "@entities/auth";
import useStyles from "./ProfileEditForm.styles";

export interface ProfileEditFormProps {
    data?: User;
    isLoading?: boolean;
    onEditPassword: () => void;
    onClose: (dirty: boolean) => void;
}

const ProfileEditForm = ({ data, isLoading, onEditPassword, onClose }: ProfileEditFormProps) => {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const { mutate: updateMe } = useUpdateMe();

    const adaptData = adaptDataForProfileEditForm(data);

    const config: FormikConfig<UpdateMeRequest> = {
        initialValues: { ...initialValuesProfileEditForm, ...adaptData },
        validationSchema: $updateMeRequest,
        onSubmit: (values, { setFieldError }) => {
            updateMe(values, {
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        for (const errorField in error.response?.data.errors) {
                            setFieldError(errorField, error.response?.data.errors[errorField][0]);
                        }
                    }
                },
            });
        },
    };

    return (
        <Form config={config} isLoading={isLoading}>
            {({ values, dirty }) => (
                <Flex direction="column" gap={32}>
                    <Flex direction="column" gap={24}>
                        <Group>
                            <UserIcon color={theme.colors.gray45[0]} />
                            <Text
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                    lineHeight: "24px",
                                    color: theme.colors.dark[0],
                                }}>
                                Личные данные
                            </Text>
                        </Group>
                        <Group sx={{ gap: 24 }}>
                            <Avatar className={classes.avatarIcon} src={values.avatar?.absolutePath} alt="avatar" w={84} h={84} radius={50}>
                                <AvatarIcon />
                            </Avatar>
                            <Flex sx={{ flexDirection: "column", gap: 8 }}>
                                <Flex sx={{ flexDirection: "column", gap: 4 }}>
                                    <Text className={classes.avatarUsername}>{`${adaptData.firstName} ${adaptData.lastName}`}</Text>
                                    <Text className={classes.avatarRole}>{adaptData.role}</Text>
                                </Flex>
                                <FFileButton name="avatar" label="Изменить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                            </Flex>
                        </Group>
                        <Flex direction={{ base: "column", sm: "row" }} wrap="wrap" gap={8}>
                            <FInput name="firstName" label="Имя" size="sm" miw={252} withAsterisk />
                            <FInput name="lastName" label="Фамилия" size="sm" miw={252} withAsterisk />
                            <FInput name="patronymic" label="Отчество" size="sm" miw={252} />
                        </Flex>
                    </Flex>

                    <Flex direction="column" gap={24}>
                        <Group>
                            <Shield color={theme.colors.gray45[0]} />
                            <Text
                                sx={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                    lineHeight: "24px",
                                    color: theme.colors.dark[0],
                                }}>
                                Системные данные
                            </Text>
                        </Group>
                        <Text className={classes.role}>{`Роль: ${adaptData.role}`}</Text>
                        <Flex direction={{ base: "column", sm: "row" }} wrap="wrap" gap={8}>
                            <FInput name="email" label="Email" size="sm" miw={252} withAsterisk />
                            <Button type="button" variant="border" onClick={onEditPassword}>
                                Изменить пароль
                            </Button>
                        </Flex>
                    </Flex>

                    <Group className={classes.actions}>
                        <Button type="button" variant="border" size="large" onClick={() => onClose(dirty)}>
                            Отмена
                        </Button>
                        <Button type="submit" variant="secondary" size="large">
                            Сохранить
                        </Button>
                    </Group>
                </Flex>
            )}
        </Form>
    );
};

export default ProfileEditForm;
