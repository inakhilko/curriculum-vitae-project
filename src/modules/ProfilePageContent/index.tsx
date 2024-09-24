import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { Profile, UpdateProfileInput, User, UpdateUserInput } from 'cv-graphql';
import { USER } from '../../apollo/queries/queries.ts';
import { DEPARTMENTS, POSITIONS, PROFILE } from '../../apollo/queries/user.ts';
import {
  UPDATE_PROFILE,
  UPDATE_USER,
} from '../../apollo/mutations/userProfile.ts';
import UploadAvatarBlock from '../../components/UploadAvatarBlock';
import FormInput from '../../UI/FormInput';
import FormSelect from '../../UI/FormSelect';
import Loader from '../../UI/Loader';
import './ProfileContent.styles.scss';

function ProfileContent() {
  const { userId } = useParams();

  const methods = useForm();

  const { data: userData, loading } = useQuery(USER, {
    variables: {
      userId,
    },
    onCompleted: (data) => {
      methods.reset({
        firstName: data.user.profile.first_name,
        lastName: data.user.profile.last_name,
        department: data.user.department.id,
        position: data.user.position.id,
      });
    },
  });

  const { data: positionsData } = useQuery(POSITIONS);
  const { data: departmentsData } = useQuery(DEPARTMENTS);

  const [updateProfile] = useMutation<Profile, { profile: UpdateProfileInput }>(
    UPDATE_PROFILE,
    {
      refetchQueries: [USER, PROFILE],
    }
  );
  const [updateUser] = useMutation<User, { user: UpdateUserInput }>(
    UPDATE_USER,
    {
      refetchQueries: [USER, PROFILE],
    }
  );

  const onSubmit = (formData) => {
    updateProfile({
      variables: {
        profile: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          userId: localStorage.getItem('cvp_user_id'),
        },
      },
    });
    updateUser({
      variables: {
        user: {
          departmentId: formData.department,
          positionId: formData.position,
          userId: localStorage.getItem('cvp_user_id'),
        },
      },
      onCompleted: () => {
        methods.reset(formData);
      },
    });
  };

  const { t } = useTranslation();

  const isMyProfile = userId === localStorage.getItem('cvp_user_id');

  if (loading) return <Loader />;

  return (
    <Container
      sx={{
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        maxWidth: '900px',
      }}
    >
      {isMyProfile ? (
        <UploadAvatarBlock />
      ) : (
        <Avatar
          src={userData?.user.profile.avatar}
          sx={{ width: '120px', height: '120px' }}
        />
      )}
      <Box
        sx={
          isMyProfile
            ? { width: '100%' }
            : {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }
        }
      >
        <Typography sx={{ fontWeight: '600', fontSize: '1.25rem' }}>
          {userData?.user.profile.full_name}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem' }}>
          {userData?.user.email}
        </Typography>
        <Typography
          sx={{ fontSize: '0.875rem' }}
        >{`${t('memberSince', { ns: 'userPage' })} ${new Date(Number(userData?.user.created_at)).toLocaleString()}`}</Typography>
      </Box>
      <FormProvider {...methods}>
        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            name="firstName"
            label={t('firstName')}
            type="text"
            readOnly={!isMyProfile}
          />
          <FormInput
            name="lastName"
            label={t('lastName')}
            type="text"
            readOnly={!isMyProfile}
          />
          <FormSelect
            name="position"
            listData={positionsData?.positions}
            label={t('positions', { count: 1 })}
            readOnly={!isMyProfile}
          />
          <FormSelect
            name="department"
            listData={departmentsData?.departments}
            label={t('departments', { count: 1 })}
            readOnly={!isMyProfile}
          />
          {isMyProfile && (
            <Button
              variant="contained"
              type="submit"
              sx={{ borderRadius: 0, gridColumnStart: 2 }}
              disabled={!methods.formState.isDirty}
            >
              {t('update')}
            </Button>
          )}
        </form>
      </FormProvider>
    </Container>
  );
}

export default ProfileContent;
