import connection from '../config/database'; 
let getTopTeacher=(limit)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let [teachers]= await  connection.query(
                "SELECT * FROM teachers LIMIT ?",[limit]
            );
            resolve(teachers);

        }catch(e)
        {
            reject(e);
        }
    })
}
let getAllTeachers=()=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let [teachers]= await  connection.query(
                "SELECT * FROM teachers"
            );
            resolve(teachers);
        }catch(e){
            reject(e);
        }
    })
}
let getTeacherByUserId=(userId)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let [teachers]= await  connection.query(
                "SELECT * FROM teachers WHERE UserId=?",[userId]
            );
            resolve(teachers[0]);

        }catch(e)
        {
            reject(e);
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

let createNewTeacher=(data)=>{
    return new Promise(async (resolve, reject)=>{
        let UserName= data.UserName;
        let Password= data.Password;
        let TeacherName= data.TeacherName;
        let TeacherBirth= data.TeacherBirth;
        let Address= data.Address;
        let Email= data.Email;
        let PhoneNumber= data.PhoneNumber;
        let UserId;
        console.log(data);
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
                        "INSERT INTO teachers ( TeacherName,TeacherBirth,Address,Email,PhoneNumber,UserId) VALUE (?,?,?,?,?,?)",
                        [TeacherName,TeacherBirth,Address,Email,PhoneNumber,UserId],
                    );
                    //console.log();
                }catch(err){
                    console.log(err);
                    //console.log("loi");
                }
            }

            resolve({
                errCode: 0,
                message: 'OK'
            })
        }catch(e){
            reject(e);
        }
    })
}
let editTeacher=(data)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let UserName= data.UserName;
            let Password= data.Password;
            let TeacherName= data.TeacherName;
            let TeacherBirth= data.TeacherBirth;
            let Address= data.Address;
            let Email= data.Email;
            let PhoneNumber= data.PhoneNumber;
            let UserId;
            //console.log('check nodejs: ', data)
            if (!data.TeacherId) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing input parameters!`
                })
            }
            let [teacher] = await connection.query(
                "SELECT * FROM teachers WHERE TeacherId=?",[data.TeacherId]
            )

            if (teacher[0]) {
                try{
                    let rs= await connection.query(
                        "UPDATE teachers SET TeacherName=? ,TeacherBirth=? ,Address=?  ,Email=? ,PhoneNumber=?  WHERE TeacherId =? "
                        ,[TeacherName,TeacherBirth,Address,Email,PhoneNumber, data.TeacherId]
                    )
                }catch(e){
                    console.log(e);
                }   
                UserId= teacher[0].UserId;
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
                    errMessage: `Update user succeed!`
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User is not found!`
                })
            }
        }catch(e){
            reject(e);
        }
    })
}




module.exports={
    getTopTeacher,
    getAllTeachers,
    getTeacherByUserId,
    createNewTeacher,
    editTeacher
}