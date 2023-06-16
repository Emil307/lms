import { Avatar, Flex, Group, Text } from "@mantine/core";
import { Edit3, Shield, User as UserIcon } from "react-feather";
import { useRouter } from "next/router";
import AvatarIcon from "public/icons/avatar.svg";
import { Button, FFileButton, FInput, ManagedForm } from "@shared/ui";
import { adaptDataForProfileEditForm } from "@features/editProfile";
import { User, UpdateMeResponse, authApi, UpdateMeForm, $UpdateMeForm } from "@entities/auth";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification } from "@shared/utils";
import useStyles from "./ProfileEditForm.styles";
import { initialValues } from "./constants";

export interface ProfileEditFormProps {
    data?: User;
    isLoading?: boolean;
    onEditPassword: () => void;
}

const ProfileEditForm = ({ data, isLoading, onEditPassword }: ProfileEditFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const adaptData = adaptDataForProfileEditForm(data);

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
        <ManagedForm<UpdateMeForm, UpdateMeResponse>
            initialValues={{ ...initialValues, ...adaptData }}
            validationSchema={$UpdateMeForm}
            mutationKey={[MutationKeys.UPDATE_ME]}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ME] }]}
            mutationFunction={updateMe}
            isLoading={isLoading}
            onCancel={handleCloseForm}
            onSuccess={onSuccess}
            onError={onError}>
            {({ values, dirty, onCancel }) => (
                <Flex direction="column" gap={32}>
                    <Fieldset label="Личные данные" icon={<UserIcon />} legendProps={{ mb: 24 }}>
                        <Flex direction="column" gap={24}>
                            <Group sx={{ gap: 24 }}>
                                <Avatar
                                    className={classes.avatarIcon}
                                    src={values.avatar?.absolutePath}
                                    alt="avatar"
                                    w={84}
                                    h={84}
                                    radius={50}>
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
                    </Fieldset>

                    <Fieldset label="Системные данные" icon={<Shield />} legendProps={{ mb: 24 }}>
                        <Flex direction="column" gap={24}>
                            <Text className={classes.role}>{`Роль: ${adaptData.role}`}</Text>
                            <Flex direction={{ base: "column", sm: "row" }} wrap="wrap" gap={8}>
                                <FInput name="email" label="Email" size="sm" miw={252} disabled />
                                <Button type="button" variant="border" onClick={onEditPassword}>
                                    Изменить пароль
                                </Button>
                            </Flex>
                        </Flex>
                    </Fieldset>

                    <Group className={classes.actions}>
                        <Button type="button" variant="border" size="large" onClick={onCancel}>
                            Отмена
                        </Button>
                        <Button type="submit" variant="secondary" size="large" disabled={!dirty}>
                            Сохранить
                        </Button>
                    </Group>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default ProfileEditForm;
