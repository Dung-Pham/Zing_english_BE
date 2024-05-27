import db from '../models/index'
import connection from '../config/database'; 
let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserName(username);
            if (isExist) {
                const [user]= await connection.query(
                    "SELECT * FROM users  WHERE users.UserName=?",
                    [username],
                );
                if (user.length!=0) {
                    let check = password === user[0].Password
                    if (check) {
                        userData.errCode = 0
                        userData.message = `OK`
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.message = `Wrong password`
                    }
                } else {
                    userData.errCode = 2
                    userData.errMesage = `User isn't found`
                }
            } else {
                userData.errCode = 1
                userData.message = "Your UserName isn't exist in system. Plz try other one."
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserName = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [user]= await connection.query(
                "SELECT * FROM users  WHERE users.UserName=?",
                [username],
            );
            if (user.length!= 0) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }

            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}


let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `User isn't exist`
                })
            }

            await db.User.destroy({
                where: { id: userId }
            })
            resolve({
                errCode: 0,
                errMessage: 'User is deleted!'
            })

        } catch (e) {
            reject(e)
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('check nodejs: ', data)
            if (!data.id || !data.gender || !data.roleId || !data.positionId) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing input parameters!`
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })

            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.phoneNumber = data.phoneNumber
                user.address = data.address
                user.gender = data.gender
                user.positionId = data.positionId
                user.roleId = data.roleId
                if (data.avatar) {
                    user.image = data.avatar
                }

                await user.save()

                resolve({
                    errCode: 0,
                    errMessage: `Update user succeed!`
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User is not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


let getUserByStudent=(userId)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let [user]= await  connection.query(
                "SELECT * FROM users WHERE UserId=?",[userId]
            );
            resolve(user[0]);

        }catch(e)
        {
            reject(e);
        }
    })
}


let getUserByTeacher=(userId)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let [user]= await  connection.query(
                "SELECT * FROM users WHERE UserId=?",[userId]
            );
            resolve(user[0]);

        }catch(e)
        {
            reject(e);
        }
    })
}
let getUserByStaff=(userId)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let [user]= await  connection.query(
                "SELECT * FROM users WHERE UserId=?",[userId]
            );
            resolve(user[0]);

        }catch(e)
        {
            reject(e);
        }
    })
}


module.exports = {
    getUserByStaff,
    getUserByTeacher,
    getAllUsers,  handleUserLogin,
    deleteUser, editUser,  
    getUserByStudent
}