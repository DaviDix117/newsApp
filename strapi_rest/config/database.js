module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', 'C:\Users\david\Documents\ReactProyects\newsApp\data.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
