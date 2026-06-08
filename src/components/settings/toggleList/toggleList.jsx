import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  Typography,
} from '@mui/material'
import { styles } from './toggleList.Styles'

export function ToggleList({ groupLabel, items, state, onToggle }) {
  return (
    <>
      {groupLabel && (
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={styles.groupLabel}
        >
          {groupLabel}
        </Typography>
      )}
      <List disablePadding>
        {items.map((item, i) => (
          <Box key={item.key}>
            <ListItem disablePadding sx={{ py: 1.5 }}>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color="text.primary"
                  >
                    {item.label}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {item.desc}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={state[item.key]}
                  onChange={() => onToggle(item.key)}
                  color="primary"
                />
              </ListItemSecondaryAction>
            </ListItem>
            {i < items.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </>
  )
}
