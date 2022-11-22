module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Transactions', 
    [
      {
        id: 1,
        debited_account_id: 2,
        credited_account_id: 1,
        value: 10,
        created_at: '2022-11-17T21:20:32.582Z'
      },
      {
        id: 2,
        debited_account_id: 1,
        credited_account_id: 2,
        value: 10,
        created_at: '2022-11-17T14:30:20.582Z'
      },
      {
        id: 3,
        debited_account_id: 3,
        credited_account_id: 1,
        value: 20,
        created_at: '2022-11-18T11:05:20.582Z'
      },
      {
        id: 4,
        debited_account_id: 3,
        credited_account_id: 2,
        value: 5,
        created_at: '2022-11-16T14:30:32.582Z'
      },
      {
        id: 5,
        debited_account_id: 2,
        credited_account_id: 3,
        value: 30,
        created_at: '2022-11-20T22:39:32.582Z'
      },
    ], { timestamps: false });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  },
}