const DailyHealthInfo = require('../models/dailyHealthInfoModel');

const resolvers = {
  Query: {
    getDailyHealthInfo: async (_, { id }) => {
      return await DailyHealthInfo.findById(id);
    },
    getDailyHealthInfos: async () => {
      return await DailyHealthInfo.find();
    },
    getDailyHealthInfosByUser: async (_, { userId }) => {
      return await DailyHealthInfo.find({ user: userId });
    },
  },
  Mutation: {
    addDailyHealthInfo: async (_, { user, pulseRate, bloodPressure, weight, bodyTemperature, respiratoryRate }, context) => {
        if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
        else if (context.user.profile !== 'nurse') throw new Error(JSON.stringify({
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
  },
};

module.exports = resolvers;