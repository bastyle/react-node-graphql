const DailyHealthInfo = require('../models/dailyHealthInfoModel');
const PatientData = require('../models/patientDataModel');
const User = require('../models/userModel');
const {NURSE, PATIENT} = require("../enums/roleEnum");

const resolvers = {
  Query: {
    getDailyHealthInfo: async (_, { id }) => {
      return await DailyHealthInfo.findById(id);
    },
    /*getDailyHealthInfos: async () => {
      return await DailyHealthInfo.find();
    },*/
    getDailyHealthInfosByUser: async (_, { userId }) => {
      return await DailyHealthInfo.find({ user: userId });
    },
/*    getPatientData: async (_, { userId }) => {
      return await PatientData.findOne({ user: userId });
    },*/
    getPatientDataByUser: async (_, { userId }, context) => {
      if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
      else if (context.user.profile !==NURSE) throw new Error(JSON.stringify({
        message: 'You are not authorized to add this data!',
        code: 403
      }));
      return await PatientData.find({ user: userId });
    },
    getUsersByRole: async (_, { role }, context) => {
      if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
      else if (context.user.profile !==NURSE) throw new Error(JSON.stringify({
        message: 'You are not authorized to get this data!',
        code: 403
      }));
      return User.find({role: role});
      //return await User.find({ role: role });
    },
  },
  Mutation: {
    addDailyHealthInfo: async (_, { user, pulseRate, bloodPressure, weight, bodyTemperature, respiratoryRate }, context) => {
        if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
        else if (context.user.profile !== PATIENT) throw new Error(JSON.stringify({
            message: 'You are not authorized to add this data!',
            code: 403
        }));

      const dailyHealthInfo = new DailyHealthInfo({ user, pulseRate, bloodPressure, weight, bodyTemperature, respiratoryRate });
      await dailyHealthInfo.save();
      return dailyHealthInfo;
    },
    updateDailyHealthInfo: async (_, { id, user, pulseRate, bloodPressure, weight, bodyTemperature, respiratoryRate }) => {
      return await DailyHealthInfo.findByIdAndUpdate(id, { user, pulseRate, bloodPressure, weight, bodyTemperature, respiratoryRate }, { new: true });
    },
    deleteDailyHealthInfo: async (_, { id }) => {
      return await DailyHealthInfo.findByIdAndDelete(id);
    },
    addPatientData: async (_, { user, vitalSigns, symptoms }, context) => {
      if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
      else if (context.user.profile !==NURSE) throw new Error(JSON.stringify({
        message: 'You are not authorized to add this data!',
        code: 403
      }));
      const patientData = new PatientData({ user, vitalSigns, symptoms });
      await patientData.save();
      return patientData;
    },
  },
};

module.exports = resolvers;