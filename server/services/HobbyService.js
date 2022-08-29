
const { validateJwt } = require("../helpers/loginCheck");
const db = require("../models");
const hobbyTable = db.chart;
const Op = db.Sequelize.Op;

module.exports = {
  //-------------------------------------------- List Hobby ---------------------------------------------------//
  async listHobby(request, reply) {
    
      const { username, name } = request.query;

      var token = request.headers.authorization.replace("Bearer ", "");

      // // start create object for compare
      var jwtAtt = {
        username: username,
      };

      var validate = await validateJwt(token, jwtAtt);
      if (!validate) {
        throw Error("Authenticate failed. Please login");
      }

      var whereString = {}
      if(name){
        whereString = {
          where: {
            name: {
              [Op.substring]: name,
            }
          }
        }
      }

      var listHobby = await hobbyTable.findAll(whereString);      

      return listHobby;
  },
  //-------------------------------------------- List Hobby ---------------------------------------------------//

  //-------------------------------------------- Create Hobby ---------------------------------------------------//
  async createHobby(request, reply) {
    const { username, name, value } = request.body;

    var token = request.headers.authorization.replace("Bearer ", "");

    // // start create object for compare
    var jwtAtt = {
      username: username,
    };

    var validate = await validateJwt(token, jwtAtt);
    if (!validate) {
      throw Error("Authenticate failed. Please login");
    }

    var findHobby = await hobbyTable.findOne({
      where: {
        name: name,
      },
    });

    if (findHobby) {
      throw Error("Hobby already exist");
    } else {
      // get id number
      var countHobby = await hobbyTable.count({});

      var createHobby = await hobbyTable.create({
        id: Number(countHobby + 1),
        name: name,
        value: value,
      });

      return createHobby;
    }
  },
  //-------------------------------------------- Create Hobby ---------------------------------------------------//

  //-------------------------------------------- Update Hobby ---------------------------------------------------//
  async updateHobby(request, reply) {
    const { username, id, name, value } = request.body;

    var token = request.headers.authorization.replace("Bearer ", "");

    // // start create object for compare
    var jwtAtt = {
      username: username,
    };

    var validate = await validateJwt(token, jwtAtt);
    if (!validate) {
      throw Error("Authenticate failed. Please login");
    }

    var whereString = {};
    if (name) {
      whereString.name = name;
    }
    if (value) {
      whereString.value = value;
    }

    if (whereString.name || whereString.value) {
      var findHobby = await hobbyTable.findOne({
        where: {
          id: id,
        },
      });

      if (findHobby) {
        // check if hobby name already exist
        var nameExist = 0;
        if (whereString.name) {
          var findHobby = await hobbyTable.findOne({
            where: {
              name: name,
            },
          });

          if (findHobby) {
            nameExist = 1;
          }
        }

        if (nameExist) {
          throw Error("Hobby name already exist");
        } else {
          var updateHobby = await hobbyTable.update(whereString, {
            where: {
              id: id,
            },
          });

          var hobbyDetail = await hobbyTable.findOne({
            where: {
              id: id,
            },
          });

          return hobbyDetail;
        }
      } else {
        throw Error("Invalid hobby id");
      }
    } else {
      throw Error("No data to update");
    }
  },
  //-------------------------------------------- Update Hobby ---------------------------------------------------//

  //-------------------------------------------- Delete Hobby ---------------------------------------------------//
  async deleteHobby(request, reply) {
    const { username, id } = request.query;

    var token = request.headers.authorization.replace("Bearer ", "");

    // // start create object for compare
    var jwtAtt = {
      username: username,
    };

    var validate = await validateJwt(token, jwtAtt);
    if (!validate) {
      throw Error("Authenticate failed. Please login");
    }

    var findHobby = await hobbyTable.findOne({
      where: {
        id: id,
      },
    });

    if (findHobby) {
      var deleteHobby = await hobbyTable.destroy({
        where: {
          id: id,
        },
      });

      if (deleteHobby) {
        return findHobby;
      }
    } else {
      throw Error("Invalid hobby id");
    }
  },
  //-------------------------------------------- Delete Hobby ---------------------------------------------------//
};
