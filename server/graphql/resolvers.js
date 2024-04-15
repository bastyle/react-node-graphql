const DailyHealthInfo = require('../models/dailyHealthInfoModel');
const PatientData = require('../models/patientDataModel');
const User = require('../models/userModel');
const {NURSE, PATIENT} = require("../enums/roleEnum");
const bcrypt = require('bcryptjs');


const resolvers = {
    Query: {
        getDailyHealthInfo: async (_, {id}) => {
            return await DailyHealthInfo.findById(id);
        },
        /*getDailyHealthInfos: async () => {
          return await DailyHealthInfo.find();
        },*/
        getDailyHealthInfosByUser: async (_, {userId}) => {
            return await DailyHealthInfo.find({user: userId});
        },
        /*    getPatientData: async (_, { userId }) => {
              return await PatientData.findOne({ user: userId });
            },*/
        getPatientDataByUser: async (_, {userId}, context) => {
            if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
            else if (context.user.profile !== NURSE) throw new Error(JSON.stringify({
                message: 'You are not authorized to add this data!',
                code: 403
            }));
            return await PatientData.find({user: userId});
        },
        getUsersByRole: async (_, {role}, context) => {
            if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
            else if (context.user.profile !== NURSE) throw new Error(JSON.stringify({
                message: 'You are not authorized to get this data!',
                code: 403
            }));
            return User.find({role: role});
            //return await User.find({ role: role });
        },
    },
    Mutation: {
        addDailyHealthInfo: async (_, {
            user,
            pulseRate,
            bloodPressure,
            weight,
            bodyTemperature,
            respiratoryRate,
            symptoms
        }, context) => {
            if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
            /*else if (context.user.profile !== PATIENT) throw new Error(JSON.stringify({
                message: 'You are not authorized to add this data!',
                code: 403
            }));*/

            const dailyHealthInfo = new DailyHealthInfo({
                user,
                pulseRate,
                bloodPressure,
                weight,
                bodyTemperature,
                respiratoryRate,
                symptoms
            });
            await dailyHealthInfo.save();
            return dailyHealthInfo;
        },
        updateDailyHealthInfo: async (_, {
            id,
            user,
            pulseRate,
            bloodPressure,
            weight,
            bodyTemperature,
            respiratoryRate
        }) => {
            return await DailyHealthInfo.findByIdAndUpdate(id, {
                user,
                pulseRate,
                bloodPressure,
                weight,
                bodyTemperature,
                respiratoryRate
            }, {new: true});
        },
        deleteDailyHealthInfo: async (_, {id}) => {
            return await DailyHealthInfo.findByIdAndDelete(id);
        },
        addPatientData: async (_, {user, vitalSigns, symptoms}, context) => {
            if (!context.user) throw new Error(JSON.stringify({message: 'You are not authenticated!', code: 401}));
            else if (context.user.profile !== NURSE) throw new Error(JSON.stringify({
                message: 'You are not authorized to add this data!',
                code: 403
            }));
            const patientData = new PatientData({user, vitalSigns, symptoms});
            await patientData.save();
            return patientData;
        },
        createUser: async (_, {username, firstName, lastName, email, role}) => {
            // Check if a user with the same username already exists
            const existingUser = await User.findOne({username});
            if (existingUser) {
                throw new Error('User already exists');
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash('defaultPassword', 10);
            // Create a new user
            const user = new User({
                username,
                firstName,
                lastName,
                email,
                role,
                password: hashedPassword,
            });
            // Save the user to the database
            await user.save();
            // Return the new user
            return user;
        },
    },
};

module.exports = resolvers;