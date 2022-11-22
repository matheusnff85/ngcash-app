module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Transactions', 
    [
      {
        id: 1,
        debited_account_id: 2,
        credited_account_id: 1,
        value: 10,
        created_at: '2022-11-17T20:28:32.582Z'
      },
      {
        id: 2,
        debited_account_id: 1,
        credited_account_id: 2,
        value: 10,
        created_at: '2022-11-17T20:28:32.582Z'
      },
      {
        id: 3,
        debited_account_id: 3,
        credited_account_id: 1,
        value: 20,
        created_at: '2022-11-17T20:28:32.582Z'
      },
      {
        id: 4,
        debited_account_id: 3,
        credited_account_id: 2,
        value: 5,
        created_at: '2022-11-17T20:28:32.582Z'
      },
      {
        id: 5,
        debited_account_id: 2,
        credited_account_id: 3,
        value: 30,
        created_at: '2022-11-17T20:28:32.582Z'
      },
    ], { timestamps: false });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
}