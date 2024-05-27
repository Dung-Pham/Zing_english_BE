import connection from '../config/database'; 
let getAllStudents=(studentId)=>{
    return new Promise(async (resolve, reject)=> {
        try{
            let students='';
            if( studentId=='ALL')
            {
                 [students]= await connection.query(
                    "SELECT * FROM students "
                );
               // resolve(students);
            }
            if (studentId && studentId!="ALL")
            {
                 [students]= await connection.query(
                    "SELECT * FROM students  WHERE StudentId=?",
                    [studentId],
                );
                //resolve(students);
            }
            resolve(students);
        }catch(e){
            reject(e);
        }
    })
}

let deleteStudent = (studentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let [student] = await connection.query(
                "SELECT * FROM students WHERE StudentId=?",[studentId]
            )
            let userId= student[0].UserId;
            if (!student[0]) {
                resolve({
                    errCode: 2,
                    errMessage: `User isn't exist`
                })
            }
             await connection.query(
                "DELETE FROM students WHERE StudentId=?",[studentId]
            )
            await connection.query(
                "DELETE FROM users WHERE UserId=?",[userId]
            )
            resolve({
                errCode: 0,
                errMessage: 'Student is deleted!'
            })
        } catch (e) {
            reject(e)
        }
    })
}

let createNewStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        let UserName= data.UserName;
        let Password= data.Password;
        let StudentName= data.StudentName;
        let StudentBirth= data.StudentBirth;
        let Address= data.Address;
        let ParentName= data.ParentName;
        let Email= data.Email;
        let PhoneNumber= data.PhoneNumber;
        let ClassId=data.ClassId;
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
                try{
                    const [results]= await connection.query(
                        "INSERT INTO users (UserName,Password) VALUE (?,?)",
                        [UserName, Password],
                    );
                     UserId= results.insertId;
                }catch(err){
                    console.log(err);
                }           
                try{
                    const [results]= await connection.query(
                        "INSERT INTO students ( StudentName,StudentBirth,Address,ParentName,Email,PhoneNumber,UserId,ClassId) VALUE (?,?,?,?,?,?,?,?)",
                        [StudentName,StudentBirth,Address,ParentName,Email,PhoneNumber,UserId,ClassId],
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

let editStudent=(data)=>{
    return new Promise(async (resolve, reject) => {
        try {

        let UserName= data.UserName;
        let Password= data.Password;
        let StudentName= data.StudentName;
        let StudentBirth= data.StudentBirth;
        let Address= data.Address;
        let ParentName= data.ParentName;
        let Email= data.Email;
        let PhoneNumber= data.PhoneNumber;
        let ClassId=data.ClassId;
        let StudentId= data.StudentId;
        let UserId;
            console.log('check nodejs: ', data)
            if (!data.StudentId|| !data.ClassId) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing input parameters!`
                })
            }
            let [student] = await connection.query(
                "SELECT * FROM students WHERE StudentId=?",[StudentId]
            )

            if (student[0]) {
                try{
                    let rs= await connection.query(
                        "UPDATE students SET StudentName=? ,StudentBirth=? ,Address=? ,ParentName=? ,Email=? ,PhoneNumber=? ,ClassId=?  WHERE StudentId =? "
                        ,[StudentName,StudentBirth,Address,ParentName,Email,PhoneNumber,ClassId, StudentId]
                    )
                }catch(e){
                    console.log(e);
                }   
                UserId= student[0].UserId;
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
        } catch (e) {
            reject(e)
        }
    })
}




let getStudentsByClassId=(classId)=>{
    return new Promise(async(resolve, reject )=>{
        try{
            let [students]= await  connection.query(
                "SELECT * FROM students WHERE ClassId=?",[classId]
            );
            resolve(students);

        }catch(e)
        {
            reject(e);
        }
    })
}
module.exports={getAllStudents,deleteStudent,createNewStudent,editStudent,getStudentsByClassId}