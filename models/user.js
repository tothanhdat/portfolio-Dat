const USER_COLL = require('../database/user-coll');

const { hash, compare } = require('bcrypt');
const { sign, verify } = require('../utils/jwt');

module.exports = class User {
    static register(email, password, firstName, lastName) {
        return new Promise(async resolve => {
            try {
                let checkExist = await USER_COLL.findOne({ email });

                if (checkExist)
                    return resolve({ error: true, message: 'email_existed' });

                let hashPassword = await hash(password, 8);
                let newUser = new USER_COLL({ firstName, lastName, email, password: hashPassword });

                let infoUser = await newUser.save();

                if (!infoUser) return resolve({ error: true, message: 'cannot_insert' });
                resolve({ error: false, data: infoUser });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static signIn(email, password) {
        return new Promise(async resolve => {
            try {
                const infoUser = await USER_COLL.findOne({ email });

                if (!infoUser)
                    return resolve({ error: true, message: 'email_not_exist' });

                const checkPass = await compare(password, infoUser.password);

                if (!checkPass)
                    return resolve({ error: true, message: 'password_not_true' });

                await delete infoUser.password;

                let token = await sign({ data: infoUser });
                return resolve({ error: false, data: { infoUser, token } });
                
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listUser = await USER_COLL.find();

                if (!listUser) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listUser });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo(userID) {
        return new Promise(async resolve => {
            try {
                let infoUser = await USER_COLL.findById(userID);

                if (!infoUser) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: infoUser });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static updateInfoBasic({ userID, firstName, lastName, email, birthday, age, story, phone, city, website }) {
        return new Promise(async resolve => {
            try {
                let dataUpdate = {
                    firstName, 
                    lastName, 
                    email, 
                    birthday, 
                    age, 
                    story, 
                    phone, 
                    city, 
                    website
                }

                let infoAfterUpdate = await USER_COLL.findByIdAndUpdate(userID, dataUpdate, 

                {new: true});

                if (!infoAfterUpdate) return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }
}