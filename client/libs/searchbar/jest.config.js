module.exports = {
  name: 'searchbar',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/searchbar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
