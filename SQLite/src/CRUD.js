//File to handle CRUD operations on the database


import db from "./database.js";


//CREATE A user and insert into the database
 
export const createUser = ({username, email, password})=>{
    try{
        const sql = "INSERT INTO users(username, email, password) VALUES(:username, :username, :password)";
        const statement = db.prepare(sql);
        const info = statement.run({username, email, password});
        return {success: true, data: info.lastInsertRowid};
    }catch (error){
        return {success: false, error: error.message};
    }
}

//READ a user from the database 
export const readUser = ({username})=>{
    try{
        const sql = ("SELECT * FROM users WHERE username = :username");
        const statement = db.prepare(sql);
        const user = statement.get({username});
        return {success: true, data: user};
    }catch (error){
        return {success: false, error: error.message}
    }
}


//Create a new task and insert into the database
export const createTask = ({task, username})=>{
    try{
        const sql = "INSERT INTO tasks(task, username) VALUES(:task, :username)";
        const statement = db.prepare(sql);
        const info = statement.run({task, username});
        return {success: true, data: info.lastInsertRowid};
    }catch (error){
        return {success: false, error: error.message};
    }
}

//Read all tasks from the database made by a specific user
export const readTask = ({username})=>{
    try{
        const sql = "SELECT * FROM tasks WHERE username = :username";
        const statement = db.prepare(sql);
        const tasks = statement.all({username});
        return {success: true , data:tasks};
    }catch (error){
        return {success: false, error: error.message};
    }
}

// Read all users present in database
export const showAllUsers = ()=>{
    try{
        const sql = "SELECT * FROM users";
        const statement = db.prepare(sql);
        const users = statement.all();
        return {success: true, data:users};
    }catch (error){
        return {success: false, error: error.message};
    }
}

// Operation to Delete a specific user from a database
export const deleteUser = ({username})=>{
    try{
        const sql = "DELETE FROM users WHERE username = :username";
        const statement = db.prepare(sql);
        const info = statement.run({username});
        return {success: true, data: info.changes};
    }catch (error){
        return {success: false, error: error.message};
    }
}




