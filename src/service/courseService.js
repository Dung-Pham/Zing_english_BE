import connection from '../config/database';
let getAllCourses =()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let [courses]= await connection.query(
                "SELECT * FROM courses"
            )
            resolve(courses);
        }catch{
            reject(e);
        }
    })
}

let getTopCourse=(limit)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let [courses]= await connection.query(
                "SELECT * FROM courses LIMIT ?",[limit]
            )
            resolve(courses);
        }catch(e){
            reject(e);
        }
    })
}
let getClassById=(id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
          
            // let [data] = await connection.query(
            //     "SELECT * FROM classes"
            // )
            // resolve(data);
            if( id=="ALL")
            {
                let [data] = await connection.query(
                    "SELECT * FROM classes"
                )
                resolve(data);
            }
            else{
                let [data] = await connection.query(
                    "SELECT * FROM classes WHERE TeacherId=?",[id]
                )
                resolve(data);
            }
            

        }catch(e){
            reject(e);
        }
    })
}

let getCourseById=(id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let [data]= await  connection.query(
                "SELECT * FROM courses WHERE CourseId=?",[id]
            );
            resolve(data[0]);

        }catch(e)
        {
            reject(e);
        }
    })
}
let editCourse=(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let rs= await connection.query(
                "UPDATE courses SET  CourseName=? , CourseFee=?, Description=? WHERE CourseId=?"
                ,[data.CourseName, data.CourseFee, data.Description, data.CourseId]
            )    
            resolve({
                errCode: 0,
                errMessage: `Update user succeed!`
            })

        }catch(e)
        {
            reject(e);
        }
    })
}
let getAllClass=()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let [classes]= await connection.query(
                "SELECT * FROM classes"
            )
            resolve(classes);
        }catch{
            reject(e);
        }
    })
}
let editClass=(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{

            try{
                let rs= await connection.query(
                    "UPDATE classes SET  ClassName=? WHERE ClassId=?"
                    ,[data.ClassName, data.ClassId]
                )
            }catch(e){
                console.log(e);
            } 
            resolve({
                errCode: 0,
                errMessage: `Update user succeed!`
            })

        }catch(e)
        {
            reject(e);
        }
    })
}

let createRegisterCourse=(data)=>{
    return new Promise( async (resolve , reject)=>{
        let CourseName= data.CourseName;
        let CourseFee= data.CourseFee;
        let StudentName= data.StudentName;
        let StudentBirth= data.StudentBirth;
        let Address= data.Address;
        let PhoneNumber= data.PhoneNumber;
        let Email= data.Email;
        let CourseId= data.CourseId;
        try{                      
            try{
                const [results]= await connection.query(
                    "INSERT INTO registercourse ( CourseName,CourseFee,StudentName,StudentBirth,Address,Email,PhoneNumber,CourseId) VALUE (?,?,?,?,?,?,?,?)",
                        [CourseName,CourseFee,StudentName,StudentBirth,Address,Email,PhoneNumber,CourseId],
                    );
            }catch(err){
                    console.log(err);                
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
let createNewCourse=(data)=>{
    return new Promise(async (resolve, reject) => {
        //let data= req.body;
        let CourseName= data.CourseName;
        let CourseFee= data.CourseFee;
        let Description= data.Description;   
        try {          
            const [results]= await connection.query(
                "INSERT INTO courses ( CourseName, Description, CourseFee) VALUE (?,?,?)",
                [CourseName, Description, CourseFee],
            );    
            resolve({
                errCode: 0,
                message: 'OK'
            })
        }catch (e) {
            reject(e)
        }
    })
}
module.exports={
    getAllCourses, 
    getTopCourse,
    getCourseById,
    getClassById,
    editCourse,
    getAllClass,
    editClass,
    createRegisterCourse,
    createNewCourse
}