import { FirebaseUploader } from '../FirebaseUploader'

jest.mock('firebase/storage', () => ({}))

const mockUploadTask = {
  on: jest.fn((a, b, c, fn) => fn()),
  snapshot: {
    ref: {
      getDownloadURL: async () => 'www.foobar.com/image',
    },
  },
}

const mockRef = {
  child: () => ({
    put: jest.fn(() => {
      return mockUploadTask
    }),
  }),
}

const mockStorage = {
  ref: jest.fn(() => mockRef),
}

jest.mock('firebase/app', () => ({
  storage: (() => {
    function mockFirebase() {
      return mockStorage
    }
    mockFirebase.TaskState = {}
    return mockFirebase
  })(),
  apps: {
    length: 20,
  },
}))

jest.mock('../utils', () => ({
  getFileData: () => ({ name: 'image', size: 2000 }),
  prepareImage: () => ({ name: 'image', size: 2000 }),
}))

it('calls uploadTask', async () => {
  const config = {
    firebase: true,
    apiKey: 'foobar',
    storageBucket: 'foobar',
  }

  const uploader = new FirebaseUploader(config)
  await uploader.upload({ type: 'foo', name: 'foo' }, {}, () => 'progress')
  expect(mockUploadTask.on).toHaveBeenCalled()
})
