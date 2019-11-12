module.exports = {
  name: 'sermon-details',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/sermon-details',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
