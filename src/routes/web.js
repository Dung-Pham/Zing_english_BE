import  Express  from "express";
import {handleHome, handleUser, handleCrud,postCRUD} from "../controller/homeController";
import {handleLogin,handleGetUserFromStudent,
    handleGetUserFromTeacher,handleGetUserFromStaff
} from "../controller/userController";
import {handleGetAllStudents,handleDeletestudent,handleCreateNewstudent,handleEditstudent, handleGetStudentsByIdClass} from "../controller/studentCotroller";
import {handleGetTopteacher, handleGetAllTeacher
    ,handleGetTeacherByUserId
    ,handleEditTeacher,
    handleDeleteTeacher,
    
    handleCreateNewsTeacher
    } from "../controller/teacherController";
import {handleGetAllCourses,handleGetClassById,
     handleGetDetailCourse,handleGetAllClass,
     handleEditCourse,handleCreateRegisterCourse,
     handleEditClass,handleCreateCourse} from "../controller/courseController";
import {handleGetAllStaff,handleEditStaff,handleCreateNewStaff,
    handleDeleteStaff,
    handleGetEvent, handleGetEventById} from "../controller/staffController";

const router = Express.Router();
// app- ep app

const initWebRoutes= (app)=>{
    router.get("/",handleHome);
    
    router.get("/user", handleUser);
    router.get("/crud", handleCrud);
    router.post("/user/create-user", postCRUD);



    // userController

    router.post('/api/login', handleLogin);


    router.get ('/api/get-user-from-student', handleGetUserFromStudent);
    router.get('/api/get-user-from-teacher',handleGetUserFromTeacher );
    router.get('/api/get-user-from-staff',handleGetUserFromStaff );
    

    // student controller
    router.get('/api/get-all-students', handleGetAllStudents);
    router.post('/api/create-new-students', handleCreateNewstudent);
    router.put('/api/edit-students', handleEditstudent);
    router.delete('/api/delete-student', handleDeletestudent);
    router.get('/api/get-student-by-class-id', handleGetStudentsByIdClass);
    
    // teacher controller
   
    router.get('/api/get-top-teachers', handleGetTopteacher);
    router.get('/api/get-all-teachers', handleGetAllTeacher);
    router.post('/api/create-new-teacher', handleCreateNewsTeacher);
    router.get('/api/get-teacher-by-user-id', handleGetTeacherByUserId);
    router.put('/api/edit-teacher', handleEditTeacher);


    //staff
    router.get('/api/get-all-staff', handleGetAllStaff);
    router.put('/api/edit-staff', handleEditStaff)
    router.post('/api/create-new-staff', handleCreateNewStaff);
    router.delete('/api/delete-staff', handleDeleteStaff);

    // courses 
    router.get('/api/get-all-courses', handleGetAllCourses);
    router.get('/api/get-detail-course', handleGetDetailCourse);
    router.put('/api/edit-course', handleEditCourse);
    router.post('/api/create-course', handleCreateCourse);



    //events 
    router.get('/api/get-all-events', handleGetEvent);
    router.get('/api/get-detail-event', handleGetEventById);
    
    // class controller

    router.get('/api/get-class-by-id', handleGetClassById);
    router.get('/api/get-all-class', handleGetAllClass);
    router.put('/api/edit-class', handleEditClass);
   // router.get()

    // RegisterCourse
    router.post('/api/create-new-register', handleCreateRegisterCourse);


    return app.use("/", router);
}

export default initWebRoutes;