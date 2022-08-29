
const db = require("../models");
const { validateJwt } = require("../helpers/loginCheck");
const chartTable = db.chart;
const userTable = db.user;
const Op = db.Sequelize.Op;
var md5 = require('md5');

module.exports = {
  //-------------------------------------------- Create User ---------------------------------------------------//
  async createUsers(request, reply) {
    const { username, password, fullname } = request.body;

    

    var findUser = await userTable.findOne({
      where: {
        username: username,
      },
    });

    if (findUser) {
      throw Error("Username already exist");
    } else {
      // get id number
      var countUser = await userTable.count({});

      var encPass = md5(password)

      var createUser = await userTable.create({
        id: Number(countUser + 1),
        username: username,
        password: encPass,
        fullname: fullname,
      });

      return createUser;
    }
  },
  //-------------------------------------------- Create User ---------------------------------------------------//

  //-------------------------------------------- Get User ---------------------------------------------------//
  async getUsers(request, reply) {
    const { username, id } = request.query;

    var token = request.headers.authorization.replace("Bearer ", "");

    // // start create object for compare
    var jwtAtt = {
      username: username,
    };

    var validate = await validateJwt(token, jwtAtt);
    if (!validate) {
      throw Boom.badRequest("Authenticate failed. Please login");
    }

    var whereString = {}
    if(id){
      whereString = {
        where: {
        id: id
      }
      }
    }


    var listUser = await userTable.findAll(whereString)
    return listUser
  },
  //-------------------------------------------- Get User ---------------------------------------------------//

  //-------------------------------------------- Update User ---------------------------------------------------//
  async updateUsers(request, reply) {
    const { username, id, password, fullname } = request.body;
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
    if (password) {
      whereString.password = password;
    }
    if (fullname) {
      whereString.fullname = fullname;
    }

    if (whereString.password || whereString.fullname) {
      var findUser = await userTable.findOne({
        where: {
          id: id,
        },
      });

      if (findUser) {
        // check if hobby name already exist
        

          var updateUser = await userTable.update(whereString, {
            where: {
              id: id,
            },
          });

          var userDetail = await userTable.findOne({
            where: {
              id: id,
            },
          });

          return userDetail;
        
      } else {
        throw Error("Invalid user id");
      }
    } else {
      throw Error("No data to update");
    }
  },
  //-------------------------------------------- Update User ---------------------------------------------------//
};
