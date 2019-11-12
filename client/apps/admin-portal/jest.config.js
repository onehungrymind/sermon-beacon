module.exports = {
  name: 'admin-portal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/admin-portal',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
