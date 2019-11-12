module.exports = {
  name: 'ui-modal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-modal',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
