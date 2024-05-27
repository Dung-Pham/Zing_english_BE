
import {getTopTeacher, getAllTeachers,
    getTeacherByUserId,
    editTeacher,
    createNewTeacher,
    } from '../service/teacherService';

export const handleGetTopteacher=async (req, res)=>{
    let limit= 5;
   // if(!limit) limit= 1;
    try{
        let data= await getTopTeacher(limit);
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
export const handleGetAllTeacher= async( req, res)=>{
    try{
        let data= await getAllTeachers();
        res.status(200).json({
            errCode: 0,
            errMassage: "OK",
            data
        })

    }catch(e){
        return res.status(200).json({
            errCode: -1,
            errMasage:"err  from server ..."
        })
    }
}
export const handleGetTeacherByUserId= async(req, res)=>{
    let userId= req.query.userId;
    try{
        let data= await getTeacherByUserId(userId);
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

export const handleCreateNewsTeacher= async(req, res)=>{
    let message = await createNewTeacher(req.body)
    console.log(message)
    return res.status(200).json(message)
}


export const handleEditTeacher= async(req, res)=>{
    let message= await editTeacher(req.body);
    return res.status(200).json(message);
}

export const handleDeleteTeacher= async(req, res)=>{}

