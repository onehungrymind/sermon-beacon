INSERT INTO
  "tags"
VALUES
  (
    '20f2c646-1e22-44e9-b52d-7659a83db911',
    'Time',
    'Sunday Morning'
  ),
  (
    '88eb803d-a925-4f68-be1b-f60792cc4b80',
    'Scripture',
    'Psalms 23:1'
  ),
  (
    '5f8f22ca-eede-4e31-9d8f-b7ab282be349',
    'Time',
    'Wednesday Meeting'
  );

INSERT INTO
  "speakers"
VALUES
  (
    'f4e5e77c-1862-11ea-8d71-362b9e155667',
    'Ron Peterson',
    'Pastor',
    'Evening Light Fellowship',
    DEFAULT,
    DEFAULT
  ),
  (
    '6cc4d795-87ef-4e84-93ff-ff3440450fe3',
    'Steven McNeilly',
    'Associate Minister',
    'Evening Light Fellowship',
    DEFAULT,
    DEFAULT
  ),
  (
    'bb2b062c-b578-42c4-be33-b9068935da2d',
    'Daniel Fraijo',
    'Associate Minister',
    'Evening Light Fellowship',
    DEFAULT,
    DEFAULT
  );

INSERT INTO
  "sermons"
VALUES
  (
    '4c6638d0-820b-41a9-8b1f-553a9b1f86b1',
    'First Sermon',
    'First Sermon Subject',
    '05/1/2018',
    DEFAULT,
    DEFAULT,
    NULL
  ),
  (
    'd44a430e-1854-11ea-8d71-362b9e155667',
    'Second Sermon',
    'Second Sermon Subject',
    '08/27/2019',
    DEFAULT,
    DEFAULT,
    NULL
  ),
  (
    '6edb3730-2cd6-11ea-978f-2e728ce88125',
    'Third Sermon',
    'Third Sermon Subject',
    '07/31/2019',
    DEFAULT,
    DEFAULT,
    NULL
  );

INSERT INTO
  "speaker_sermons"
VALUES
  (
    DEFAULT,
    'f4e5e77c-1862-11ea-8d71-362b9e155667',
    '4c6638d0-820b-41a9-8b1f-553a9b1f86b1'
  ),
  (
    DEFAULT,
    '6cc4d795-87ef-4e84-93ff-ff3440450fe3',
    'd44a430e-1854-11ea-8d71-362b9e155667'
  ),
  (
    DEFAULT,
    'bb2b062c-b578-42c4-be33-b9068935da2d',
    '6edb3730-2cd6-11ea-978f-2e728ce88125'
  );

INSERT INTO
  "media"
VALUES
  (
    '35d2dba4-1855-11ea-8d71-362b9e155667',
    DEFAULT,
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/SETVXAlkaOY"
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>',
    DEFAULT,
    DEFAULT,
    'VIDEO',
    '4c6638d0-820b-41a9-8b1f-553a9b1f86b1'
  ),
  (
    '35d2df28-1855-11ea-8d71-362b9e155667',
    DEFAULT,
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/SETVXAlkaOY"
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>',
    DEFAULT,
    DEFAULT,
    'VIDEO',
    'd44a430e-1854-11ea-8d71-362b9e155667'
  ),
  (
    '9965bdac-185b-11ea-8d71-362b9e155667',
    DEFAULT,
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/SETVXAlkaOY"
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;
      picture-in-picture" allowfullscreen></iframe>',
    DEFAULT,
    DEFAULT,
    'VIDEO',
    '6edb3730-2cd6-11ea-978f-2e728ce88125'
  );

UPDATE
  "sermons"
SET
  "media_id" = '35d2dba4-1855-11ea-8d71-362b9e155667'
WHERE
  "id" = '4c6638d0-820b-41a9-8b1f-553a9b1f86b1';

UPDATE
  "sermons"
SET
  "media_id" = '35d2df28-1855-11ea-8d71-362b9e155667'
WHERE
  "id" = 'd44a430e-1854-11ea-8d71-362b9e155667';

UPDATE
  "sermons"
SET
  "media_id" = '9965bdac-185b-11ea-8d71-362b9e155667'
WHERE
  "id" = '6edb3730-2cd6-11ea-978f-2e728ce88125';

INSERT INTO
  "sermon_tags"
VALUES
  (
    DEFAULT,
    '4c6638d0-820b-41a9-8b1f-553a9b1f86b1',
    '20f2c646-1e22-44e9-b52d-7659a83db911'
  );
