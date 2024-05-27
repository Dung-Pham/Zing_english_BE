import {getAllCourses, getTopCourse,getClassById,createRegisterCourse,
     getCourseById, editCourse,getAllClass, editClass,
     createNewCourse} from "../service/courseService";

export const handleCreateCourse= async (req, res)=>{
    let message = await createNewCourse(req.body)
    console.log(message)
    return res.status(200).json(message)
}
export const handleGetDetailCourse= async(req, res)=>{
    let id= req.query.id;
    try{
        let data= await getCourseById(id);
        res.status(200).json({
            errCode: 0,
            errMassage: "OK",
            data
        })
    }catch(e)
    {
        res.status(200).json({
            errCode: 1,
            errMassage: "error from server ..."
        })
    }
}
export const handleGetAllCourses= async(req, res)=>{
    try{
        let data= await getAllCourses();
        res.status(200).json({
            errCode: 0,
            errMassage: "OK",
            data
        })
    }catch(e)
    {
        res.status(200).json({
            errCode: 1,
            errMassage: "error from server ..."
        })
    }
}
export const handleGetTopCourse= async(req, res)=>{
    let limit= req.query.limit;
    if(!limit ) limit= 5;
    try{
        let courses= await getTopCourse(limit);
        res.status(200).json({
            errCode: 1,
            errMassage: "OK",
            courses
        })

    }catch(e)
    {
        res.status(200).json({
            errCode: -1,
            errMassage: "err from server ..."
        })
    }
}
export const handleGetClassById= async(req, res)=>{
    let id= req.query.id;
    let data= await getClassById(id);
    try{
        return res.status(200).json({
            errCode: 0,
            errMasage: "OK",
            data
        })

    }catch(e){
        return res.status(200).json({
            arrCode:1,
            errMassage: "err from server ... "
        })
    }
}
export const handleEditCourse= async(req,res)=>{
    let data = req.body;
    let message = await editCourse(data);
    return res.status(200).json(message);

}

export const handleGetAllClass= async(req, res)=>{
    let data= await getAllClass();
    try{
        return res.status(200).json({
            errCode: 0,
            errMasage: "OK",
            data
        })

    }catch(e){
        return res.status(200).json({
            arrCode:1,
            errMassage: "err from server ... "
        })
    }
}

export const handleEditClass= async(req,res)=>{
    let data = req.body;
    let message = await editClass(data);
    return res.status(200).json(message);

}

export const handleCreateRegisterCourse= async(req, res)=>{
    let data= req.body;
    let message= await createRegisterCourse(data);
    return res.status(200).json(message);
}