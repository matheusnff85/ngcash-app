module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', 
    [
      {
        id: 1,
        username: 'user1',
        password: '$2a$10$EU7qndnMZMEbyetSPNhQuuMXFM6bBo0AvCkjID5TunBEMahCYnu5O', // 1234567A
        account_id: 1,
      },
      {
        id: 2,
        username: 'user2',
        password: '$2a$10$Ev6SJ93/x3hrGpL6dgbXHeRmXushOGqRAGnIm9BSI17hBhh2UYOAC', // 11223344A 
        account_id: 2,
      },
      {
        id: 3,
        username: 'user3',
        password: '$2a$10$s9WLxubwBFcVKtlgsDS6FO.ifJp29cnkuAxkM2t6OoF42CbIncqo6', // 10203040A
        account_id: 3,
      },
    ], { timestamps: false });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
}