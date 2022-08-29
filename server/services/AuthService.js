
const db = require("../models");
const { createJwt, validateJwt } = require("../helpers/loginCheck");
const chartTable = db.chart;
const userTable = db.user;
const Op = db.Sequelize.Op;
var md5 = require('md5');

module.exports = {
  //-------------------------------------------- Login ---------------------------------------------------//
  async login(request, reply) {
    const { username, password } = request.body;

    var encPass = md5(password)
    var login = await userTable.findOne({
      where: {
        username: username,
        password: encPass,
      },
    });

    if (login) {
      // start create token
      var jwtAtt = {
        username: username,
      };

      var token = await createJwt(jwtAtt);
      // done create token

      var data = {
        id: login.id,
        fullname: login.fullname,
        username: username,
        token: token,
      };

      return data;
    } else {
      throw Error("Username and password not match");
    }
  },
  //-------------------------------------------- Login ---------------------------------------------------//

  //-------------------------------------------- Logout ---------------------------------------------------//
  async logout(request, reply) {
    const { username } = request.query;

    var token = request.headers.authorization.replace("Bearer ", "");

    // // start create object for compare
    var jwtAtt = {
      username: username,
    };

    var validate = await validateJwt(token, jwtAtt);
    if (!validate) {
      throw Boom.badRequest("Authenticate failed. Please login");
    }

    var listUser = await userTable.findOne({
      where: {
        username: username
      }
    })
    return listUser
  },
  //-------------------------------------------- Logout ---------------------------------------------------//
};
