module.exports = {
  name: 'user-portal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/user-portal',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
