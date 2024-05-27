import {
    handleUserLogin,getUserByStudent,getUserByTeacher,getUserByStaff
} from '../service/userService'


export const  handleLogin = async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter'
        })
    }
    let userData = await handleUserLogin(username, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
    }
    
    export const handleGetUserFromStudent= async(req, res)=>{
        let userId= req.query.id;
        try{
            let data= await getUserByStudent(userId);
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



    export const handleGetUserFromTeacher= async(req, res)=>{
        let userId= req.query.id;
        try{
            let data= await getUserByTeacher(userId);
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
    export const handleGetUserFromStaff= async(req, res)=>{
        let userId= req.query.id;
        try{
            let data= await getUserByStaff(userId);
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
    
