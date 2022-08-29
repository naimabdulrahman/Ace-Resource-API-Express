const HobbyService = require("../services/HobbyService");

module.exports = {
  listHobby: async (req, res) => {
    try {
      var hobby = await HobbyService.listHobby(req, res);
      return res.status(200).json({
        status: 200,
        message: "Succesfully Retrieve list Hobby",
        data: hobby,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },

  createHobby: async (req, res) => {
    try {
      var hobby = await HobbyService.createHobby(req, res);
      return res.status(200).json({
        status: 200,
        message: "Succesfully create Hobby",
        data: hobby,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },

  updateHobby: async (req, res) => {
    try {
      var hobby = await HobbyService.updateHobby(req, res);
      return res.status(200).json({
        status: 200,
        message: "Succesfully update Hobby",
        data: hobby,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },

  deleteHobby: async (req, res) => {
    try {
      var hobby = await HobbyService.deleteHobby(req, res);
      return res.status(200).json({
        status: 200,
        message: "Succesfully delete Hobby",
        data: hobby,
      });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  },
};
