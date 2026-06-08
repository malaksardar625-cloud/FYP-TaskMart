import { Box, Avatar, Typography, IconButton, Tooltip } from '@mui/material'
import {
  ArrowBack,
  MoreVert,
  VideocamOutlined,
  PhoneOutlined,
} from '@mui/icons-material'
import { getInitials } from '../../../pages/chat/chat.utils'
import * as S from './chatWindowHeader.Styles'

export default function ChatWindowHeader({ conversation, isOnline, onBack }) {
  const otherUser = conversation?.otherUser ?? {}
  const name = otherUser.fullName ?? otherUser.userName ?? 'Unknown'
  const initials = getInitials(name)

  return (
    <Box sx={S.chatHeader}>
      <IconButton sx={S.mobileBackBtn} onClick={onBack}>
        <ArrowBack />
      </IconButton>

      <Box sx={S.avatarWrapper}>
        <Avatar
          src={otherUser.profileImage?.file?.url ?? undefined}
          sx={S.chatHeaderAvatar}
        >
          {initials}
        </Avatar>
        {isOnline && <Box sx={S.onlineDot} />}
      </Box>

      <Box>
        <Typography sx={S.chatHeaderName}>{name}</Typography>
        <Typography
          sx={isOnline ? S.chatHeaderStatusOnline : S.chatHeaderStatus}
        >
          {isOnline ? 'Online' : 'Offline'}
        </Typography>
      </Box>

      <Box sx={S.chatHeaderActions}>
        <Tooltip title="Voice call">
          <IconButton sx={S.chatHeaderBtn}>
            <PhoneOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Video call">
          <IconButton sx={S.chatHeaderBtn}>
            <VideocamOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="More options">
          <IconButton sx={S.chatHeaderBtn}>
            <MoreVert fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
