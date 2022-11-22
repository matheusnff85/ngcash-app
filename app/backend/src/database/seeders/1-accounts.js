module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', 
    [
      {
        id: 1,
        balance: 105,
      },
      {
        id: 2,
        balance: 85,
      },
      {
        id: 3,
        balance: 120,
      }
    ], { timestamps: false });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  },
}