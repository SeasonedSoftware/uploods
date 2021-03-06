import React from 'react'
import map from 'lodash/map'
import {
  Avatar,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import { RemoveCircle, PictureAsPdf, InsertDriveFile } from '@material-ui/icons'
// @ts-ignore
import { clipString } from '@seasonedsoftware/utils/dist/helpers'
import { humanizeBytes } from './utils'
import { FileState, FileData } from './typeDeclarations'

const FilePreview = ({ type, parsed }: FileData) => {
  const [prefix] = type.split('/')

  return prefix === 'image' ? (
    <ListItemAvatar>
      <Avatar
        style={{ borderRadius: 0 }}
        alt="Preview"
        src={parsed as string}
      />
    </ListItemAvatar>
  ) : (
    <ListItemIcon>
      {type === 'application/pdf' ? <PictureAsPdf /> : <InsertDriveFile />}
    </ListItemIcon>
  )
}

interface ItemProps {
  file: FileData
  onClick: () => void
  showRemoveIcon?: Boolean
}

const FileItem = ({ file, onClick, showRemoveIcon = true }: ItemProps) => (
  <ListItem alignItems="center">
    <FilePreview {...file} />
    {file.state === 'done' ? (
      <ListItemText
        primary={clipString(file.name, 35)}
        secondary={humanizeBytes(file.size)}
      />
    ) : (
      <LinearProgress
        style={{ width: '100%', borderRadius: 5, height: 10 }}
        variant="determinate"
        value={file.percent}
      />
    )}
    {showRemoveIcon && (
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Remove" onClick={onClick}>
          <RemoveCircle color="secondary" />
        </IconButton>
      </ListItemSecondaryAction>
    )}
  </ListItem>
)

interface ListProps {
  removeFile: (t: string) => void
  files: FileState
  showRemoveIcon?: Boolean
}

const FilesList = ({ files, removeFile, showRemoveIcon = true }: ListProps) => {
  if (!Object.keys(files).length) return null
  return (
    <React.Fragment>
      <Divider />
      <List>
        {map(files, (file, id) => (
          <FileItem
            key={`file-${id}`}
            file={file}
            showRemoveIcon={showRemoveIcon}
            onClick={() => {
              if (file.uploadTask && file.state === 'running') {
                file.uploadTask.cancel()
              }
              removeFile(id)
            }}
          />
        ))}
      </List>
    </React.Fragment>
  )
}

export default FilesList
