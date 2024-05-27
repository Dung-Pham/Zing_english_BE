
import {getAllStudents,deleteStudent,createNewStudent,
    getStudentsByClassId,editStudent} from '../service/studentService';
export const handleEditstudent= async(req, res)=>{
    let data = req.body;
    let message = await editStudent(data);
    return res.status(200).json(message);
    
}
export const handleGetAllStudents=async(req, res)=>{
    let id= req.query.id;//all,id
    if(!id)
    {
        return res.status(200).json({
            errCode: 1,
            errMassage :"not ",
            students
        })
    }
    let students= await getAllStudents(id);
    return res.status(200).json({
        errCode: 0,
        errMassage :"OK",
        students
    })
}
export const handleDeletestudent=async(req, res)=>{
    let id= req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!'
        })
    }
    let message = await deleteStudent(id)
    return res.status(200).json(message)
}

export const handleCreateNewstudent=async(req, res)=>{
    let message = await createNewStudent(req.body)
    console.log(message)
    return res.status(200).json(message)
}

export const handleGetStudentsByIdClass= async(req, res)=>{
    
    let classId= req.query.id;
    try{
        let data= await getStudentsByClassId(classId);
        return res.status(200).json(
            {
            errCode: 0,
            errMassage :"OK",
            data
            }
        );

    } catch(e){
        return res.status(200).json({
            errCode: -1,
            errMessage:"eror from server ..."
        })
    }
}