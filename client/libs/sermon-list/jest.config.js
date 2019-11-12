module.exports = {
  name: 'sermon-list',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/sermon-list',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
