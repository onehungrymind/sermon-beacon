module.exports = {
  name: 'sermons',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/sermons',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
