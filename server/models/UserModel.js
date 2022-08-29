module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      autoIncrement: true,
      type: Sequelize.BIGINT,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.BIGINT,
    },
    fullname: {
      type: Sequelize.BIGINT,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return User;
};
