module.exports = {
  name: 'ui-sidenav',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ui-sidenav',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
