import { Box, BoxProps, Flex } from "@mantine/core";
import { Shield, User as UserIcon } from "react-feather";
import { useRouter } from "next/router";
import { Button, FAvatarInput, FControlButtons, FInput, ManagedForm, Paragraph } from "@shared/ui";
import { User, UpdateMeResponse, authApi, UpdateMeForm, $UpdateMeForm } from "@entities/auth";
import { EntityNames, MutationKeys } from "@shared/constant";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification } from "@shared/utils";
import { adaptDataForUpdateProfileForm } from "@features/profile";
import useStyles from "./UpdateProfileForm.styles";
import { initialValues } from "./constants";

export interface UpdateProfileFormProps extends BoxProps {
    data?: User;
    isLoading?: boolean;
    onEditPassword: () => void;
}

const UpdateProfileForm = ({ data, isLoading, onEditPassword, ...props }: UpdateProfileFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const adaptData = adaptDataForUpdateProfileForm(data);

    const updateMe = ({ avatar, ...data }: UpdateMeForm) => {
        return authApi.updateMe({ ...data, avatarId: avatar?.id });
    };

    const handleCloseForm = () => {
        router.push("/profile");
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены!",
        });
        router.push("/profile");
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления профиля",
        });
    };

    return (
        <Box className={classes.root} {...props}>
            <ManagedForm<UpdateMeForm, UpdateMeResponse>
                initialValues={{ ...initialValues, ...adaptData }}
                validationSchema={$UpdateMeForm}
                mutationKey={[MutationKeys.UPDATE_ME]}
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.AUTH }}
                mutationFunction={updateMe}
                isLoading={isLoading}
                onCancel={handleCloseForm}
                onSuccess={onSuccess}
                onError={onError}>
                {({ onCancel }) => (
                    <Flex direction="column" gap={32}>
                        <Fieldset label="Личные данные" icon={<UserIcon />} legendProps={{ mb: 24 }}>
                            <Flex direction="column" gap={24}>
                                <FAvatarInput
                                    name="avatar"
                                    label="Изменить аватар"
                                    description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                                    title={`${adaptData.firstName} ${adaptData.lastName}`}
                                    subtitle={adaptData.role}
                                />
                                <Flex wrap="wrap" gap={8}>
                                    <FInput
                                        name="firstName"
                                        label="Имя"
                                        onlyLetters
                                        size="sm"
                                        miw={{ base: "100%", xs: 252 }}
                                        withAsterisk
                                    />
                                    <FInput
                                        name="lastName"
                                        label="Фамилия"
                                        onlyLetters
                                        size="sm"
                                        miw={{ base: "100%", xs: 252 }}
                                        withAsterisk
                                    />
                                    <FInput name="patronymic" label="Отчество" onlyLetters size="sm" miw={{ base: "100%", xs: 252 }} />
                                </Flex>
                            </Flex>
                        </Fieldset>

                        <Fieldset label="Системные данные" icon={<Shield />} legendProps={{ mb: 24 }}>
                            <Flex direction="column" gap={24} w="100%">
                                <Paragraph variant="text-small-m">{`Роль: ${adaptData.role}`}</Paragraph>
                                <Flex wrap="wrap" gap={8}>
                                    <FInput name="email" label="Email" size="sm" miw={{ base: "100%", xs: 252 }} disabled />
                                    <Button type="button" variant="border" onClick={onEditPassword} w="fit-content">
                                        Изменить пароль
                                    </Button>
                                </Flex>
                            </Flex>
                        </Fieldset>
                        <FControlButtons onClose={onCancel} cancelButtonText="Отмена" />
                    </Flex>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdateProfileForm;
