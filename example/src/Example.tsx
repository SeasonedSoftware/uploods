import React, { useState } from 'react'
import map from 'lodash/map'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Card, CardHeader, CardContent } from '@material-ui/core'
// @ts-ignore
import { Dropzone, Provider } from 'uploods'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  storageBucket: process.env.REACT_APP_BUCKET,
}

const Example = () => {
  const [files, setFiles] = useState()
  return (
    <Provider {...config}>
      <Card elevation={5}>
        <CardHeader title="Accept Images" />
        <CardContent>
          {files && !!Object.keys(files).length && (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {map(files, (file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
          <Dropzone
            config={config}
            containerStyle={{ margin: '1rem auto' }}
            accept={['image/*']}
            onChange={setFiles}
          />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { Dropzone } from 'uploods'

// MyComponent
const [files, setFiles] = useState([])
<Dropzone
  accept={['image/*']}
  onChange={setFiles}
/>
`}
        </SyntaxHighlighter>
      </Card>
      <Card elevation={5}>
        <CardHeader title="Accept PDF" />
        <CardContent>
          <Dropzone
            containerStyle={{ margin: '1rem auto' }}
            accept={['application/pdf']}
            onChange={() => null}
          />
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { Dropzone } from 'uploods'

// MyComponent
const [files, setFiles] = useState([])
<Dropzone
  accept={['application/pdf']}
  onChange={setFiles}
/>
`}
        </SyntaxHighlighter>
      </Card>
      <Card elevation={5}>
        <CardHeader title="Configuring" />
        <CardContent>
          <p>You must provide some firebase basic configuration</p>
        </CardContent>
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { Dropzone, Provider } from 'uploods'

// With a provider
<Provider
  storageBucket="MyFirebaseBucket"
  apiKey="MyFirebaseAPIKey"
>
  <Dropzone ... />
</Provider>

// Or in the Dropzone call
<Dropzone config={{ apiKey, storageBucket }} ... />
`}
        </SyntaxHighlighter>
      </Card>
      <Card elevation={5}>
        <CardHeader title="Using the Uploods class" />
        <SyntaxHighlighter language="javascript" style={prism}>
          {`import { Uploods } from 'uploods'

// First initialize with your firebase info
const api = new Uploods({ apiKey, storageBucket })
// Then call the upload function
api.upload(myFile).then(fileData =>
  console.log(
    fileData.url,
    fileData.fullPath,
    fileData.type,
    fileData.state,
    // ...
  ))

// If you want to resize images before uploading
api.upload(myFile, {
  maxWidth: 400,
  maxHeight: 400,
  quality: .4,
}).then(/* ... */)

// If you want to monitor progress
api.upload(myFile, myConfig, file => {
  console.log(
    file.id, // the path in which the file is stored
    file.name // the filename
    file.percent // number 0-100
    file.state // 'paused' | 'running' | 'done'
    file.type // the file contentType
    file.size // the size in number of bytes
    file.parsed // a base64 string version of the file
    file.fullPath // only when upload is completed
    file.url // when completed, the url to see the image
    file.bucket // only when completed
    file.uploadTask // you can cancel the upload
    // by calling: file.uploadTask.cancel()
    // you can also file.uploadTask.pause()
    // and file.uploadTask.resume()
  )
})
`}
        </SyntaxHighlighter>
      </Card>
    </Provider>
  )
}

export default Example