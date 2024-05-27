import  Express  from "express";
/**
 * 
 * @param {*} app- exp app 
 */
const configViewEngine= (app)=> {
    app.use(Express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine ;
// export 1 tham chieu