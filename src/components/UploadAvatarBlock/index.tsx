import { Avatar, Box, IconButton, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useMutation, useQuery } from '@apollo/client';
import { PROFILE } from '../../apollo/queries/user.ts';
import { useParams } from 'react-router-dom';
import { USER } from '../../apollo/queries/queries.ts';
import {
  DELETE_AVATAR,
  UPLOAD_AVATAR,
} from '../../apollo/mutations/userProfile.ts';
import { useEffect, useState } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useTranslation } from 'react-i18next';
import './UploadAvatarBlock.styles.scss';

function UploadAvatarBlock({}) {
  const { userId } = useParams();

  const { data } = useQuery(USER, {
    variables: {
      userId,
    },
  });

  const { t } = useTranslation();

  const [upload] = useMutation(UPLOAD_AVATAR, {
    refetchQueries: [
      { query: PROFILE, variables: { userId } },
      { query: USER, variables: { userId } },
    ],
  });
  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    refetchQueries: [
      { query: PROFILE, variables: { userId } },
      { query: USER, variables: { userId } },
    ],
  });

  const [avatar, setAvatar] = useState<'' | File>('');

  const onAvatarDelete = () => {
    deleteAvatar({
      variables: {
        avatar: {
          userId: localStorage.getItem('cvp_user_id'),
        },
      },
    });
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setAvatar(event.dataTransfer.files[0]);
  };

  const handleFileChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onload = function () {
        upload({
          variables: {
            avatar: {
              userId: localStorage.getItem('cvp_user_id'),
              base64: reader.result,
              size: Number(avatar.size),
              type: avatar.type,
            },
          },
        });
      };
    }
  }, [avatar]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        width: '100%',
      }}
    >
      <Box sx={{ position: 'relative', padding: '0.5rem' }}>
        <Avatar
          src={data?.user.profile.avatar}
          sx={{ width: '120px', height: '120px' }}
        />
        {data?.user.profile.avatar && (
          <IconButton
            onClick={onAvatarDelete}
            sx={{
              width: '1em',
              height: '1em',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <CloseOutlinedIcon
              sx={{
                width: '0.75em',
                height: '0.75em',
              }}
            />
          </IconButton>
        )}
      </Box>
      <label
        className="upload-image"
        htmlFor="avatar"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            fontWeight: '600',
          }}
        >
          <FileUploadOutlinedIcon />
          {t('uploadAvatar', { ns: 'userPage' })}
        </Typography>
        <Typography sx={{ opacity: '0.8' }}>
          {t('avatarWeightLimitation', { ns: 'userPage' })}
        </Typography>
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          size={500}
          id="avatar"
          hidden
          onChange={handleFileChange}
        />
      </label>
    </Box>
  );
}

export default UploadAvatarBlock;
