import connection from "../config/database";

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
let getAllStaff= ()=>{
    return new Promise(async (resolve, reject )=>{
        try{
            let [staff]= await connection.query(
                "SELECT * FROM staff"
            )
            resolve(staff);

        }catch(e)
        {
            reject(e);
        }
    })
}
let createNewStaff=(data)=>{
    return new Promise(async (resolve , reject)=>{
        let UserName= data.UserName;
        let Password= data.Password;
        let StaffName= data.StaffName;
        let StaffBirth= data.StaffBirth;
        let Address= data.Address;
        let Email= data.Email;
        let PhoneNumber= data.PhoneNumber;
        let UserId;
        try {
            let check = await checkUserName(data.UserName)
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your username is already in used. Plz try another username!'
                })
            }
            else {
                console.log('check data nodejs: ', data)
                try{
                    const [results]= await connection.query(
                        "INSERT INTO users (UserName,Password) VALUE (?,?)",
                        [UserName, Password],
                    );
                     UserId= results.insertId;
                   // console.log(results.insertId);
                }catch(err){
                    console.log(err);
                    //console.log("loi");
                }
                try{
                    const [results]= await connection.query(
                        "INSERT INTO staff ( StaffName,StaffBirth,Address,Email,PhoneNumber,UserId) VALUE (?,?,?,?,?,?)",
                        [StaffName,StaffBirth,Address,Email,PhoneNumber,UserId],
                    );
                }catch(err){
                    console.log(err);
                }
            }
            resolve({
                errCode: 0,
                message: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getAllEvent=()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let [data]= await connection.query(
                "SELECT * FROM events"
            )
            resolve(data);

        }catch(e){
            reject(e);
        }

    })
}
let getEventById=(id)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let [data]= await  connection.query(
                "SELECT * FROM events WHERE ID=?",[id]
            );
            resolve(data[0]);

        }catch(e)
        {
            reject(e);
        }
    })
}
let editStaff=(data)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let UserName= data.UserName;
            let Password= data.Password;
            let StaffName= data.StaffName;
            let StaffBirth= data.StaffBirth;
            let Address= data.Address;
            let Email= data.Email;
            let PhoneNumber= data.PhoneNumber;
            let StaffId= data.StaffId;
            let UserId;
            //console.log('check nodejs: ', data)
            if (!data.StaffId) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing input parameters!`
                })
            }
            let [staff] = await connection.query(
                "SELECT * FROM staff WHERE StaffId=?",[StaffId]
            )

            if (staff[0]) {
                try{
                    let rs= await connection.query(
                        "UPDATE staff SET StaffName=? ,StaffBirth=? ,Address=?  ,Email=? ,PhoneNumber=?  WHERE StaffId =? "
                        ,[StaffName,StaffBirth,Address,Email,PhoneNumber, StaffId]
                    )
                }catch(e){
                    console.log(e);
                }   
                UserId= staff[0].UserId;
                let [user] = await connection.query(
                    "SELECT * FROM users WHERE UserId=?",[UserId]
                )
                if(user[0])
                    {
                        try{
                            let rs= await connection.query(
                                "UPDATE users SET  UserName=? , Password=? WHERE UserId=?"
                                ,[UserName, Password, UserId]
                            )
                        }catch(e){
                            console.log(e);
                        } 
                    }

                resolve({
                    errCode: 0,
                    errMessage: `Update staff succeed!`
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `Staff is not found!`
                })
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteStaff=(StaffId)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let [staff] = await connection.query(
                "SELECT * FROM staff WHERE StaffId=?",[StaffId]
            )
            
            if (!staff[0]) {
                resolve({
                    errCode: 2,
                    errMessage: `User isn't exist`
                })
            }
            let userId= staff[0].UserId;
            try{
                await connection.query(
                    "DELETE FROM staff WHERE StaffId=?",[StaffId]
                )
                await connection.query(
                    "DELETE FROM users WHERE UserId=?",[userId]
                )
            }catch(e){
                console.log(e);
            }
            
            resolve({
                errCode: 0,
                errMessage: 'Staff is deleted!'
            })

        } catch (e) {
            reject(e)
        }
    })
}
module.exports={
   getAllStaff,
   getAllEvent,
   getEventById,
   editStaff,
   createNewStaff,
   deleteStaff
}