import {getAllStaff,createNewStaff, getAllEvent,getEventById
    ,editStaff,deleteStaff
} from '../service/staffService';

export const handleEditStaff=async(req, res)=>{
    let message= await editStaff(req.body);
    return res.status(200).json(message);

}
export const handleCreateNewStaff=async(req, res)=>{
    let message= await createNewStaff(req.body);
    console.log(message);
    return res.status(200).json(message);
    

}
export const handleGetAllStaff=async (req, res)=>{
    try{
        let staff= await getAllStaff();
        return res.status(200).json({
            errCode: 0,
            errMasage: "OK",
            staff
        })

    }catch(e){
        return res.status(200).json({
            errCode: 1,
            errMasage: "err from server ..."
        })
    }
}
export const handleGetEvent= async(req, res)=>{
    try{
        let data= await getAllEvent();
        return res.status(200).json({
            errCode: 0,
            errMasage:"OK",
            data
        })

    }catch(e){
        return res.status(200).json({
            errCode: 1,
            errMasage:" err from server"
        })
    }
}

export const handleGetEventById= async(req, res)=>{
    let id= req.query.id;
    try{
        let data= await getEventById(id);
        return res.status(200).json({
            errCode: 0,
            errMasage:"OK",
            data
        })

    }catch(e){
        return res.status(200).json({
            errCode: 1,
            errMasage:" err from server"
        })
    }
}

export const handleDeleteStaff= async(req, res)=>{
    let id= req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter!'
        })
    }
    let message = await deleteStaff(id);
    return res.status(200).json(message);
}