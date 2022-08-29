module.exports = (sequelize, Sequelize) => {
  const Chart = sequelize.define("charts", {
    id: {
      autoIncrement: true,
      type: Sequelize.BIGINT,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.BIGINT,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  });

  return Chart;
};
