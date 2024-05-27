import connection from "../config/database";
import {createNewUser} from "../service/CRUDservice";

export const handleHome= async (req, res)=>{
    try{

        try{
            const [results, fields] = await connection.query('SELECT * FROM `Teachers`');
            return res.render("home.ejs", {
                data: JSON.stringify(results)
            });
        }catch(er){
            console.log(er);
        }
    }catch(e){
        console.log(e);
    }
    
}
export const handleUser= (req, res) =>{
    return res.render("user.ejs")
}

export const handleCrud= (req, res) =>{
    return res.render("user.ejs")
}


export const postCRUD= async (req, res)=>{
    await createNewUser(req.body);
   //console.log(req.body);
    return res.send("crud post from server")
}