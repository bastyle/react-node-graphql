const DailyHealthInfo = require('../models/dailyHealthInfoModel');

const resolvers = {
  Query: {
    getDailyHealthInfo: async (_, { id }) => {
      return await DailyHealthInfo.findById(id);
    },
    getDailyHealthInfos: async () => {
      return await DailyHealthInfo.find();
    },
  },
  Mutation: {
    addDailyHealthInfo: async (_, { user, pulseRate, bloodPressure, weight, bodyTemperature, respiratoryRate }) => {
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
  },
};

module.exports = resolvers;