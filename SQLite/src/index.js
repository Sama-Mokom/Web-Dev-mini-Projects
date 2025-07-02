import express, { json } from 'express';
import { createUser, readUser, createTask, readTask, showAllUsers, deleteUser } from './CRUD.js';
const app = express();

app.use(json());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    console.log('Body:', req.body);
    console.log('Query:', req.query);
    next();
});


//Endpoint to get and display all the tasks in the database authored by a specific user
app.get('/tasks', (req, res) => {
    const { username } = req.query;
    
    try {
        let result;
        if ({username}) {
            result = readTask({username});
        }
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Endpoint to create a new task for a specific user and insert into the database
app.post('/tasks', (req, res) => {
    console.log('Creating task with body:', req.body);
    
    // Check if req.body exists
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
    }
    
    const { task, username } = req.body;
    
    if (!task || !username) {
        return res.status(400).json({ 
            error: 'Task and username are required',
            received: { task, username }
        });
    }
    
    try {
        const result = createTask({task, username});
        if (result.success) {
            res.status(201).json({ 
                message: "Task created successfully", 
                id: result.id 
            });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//endpoint to create a new user and insert into the database
app.post('/users', (req, res) => {
    console.log('Creating user with body:', req.body);
    
    // Check if req.body exists
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
    }
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    
    try {
        const result = createUser({username, email, password});
        if (result.success) {
            res.status(201).json({ 
                message: "User created successfully", 
                id: result.id 
            });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Endpoint to Search for a user by username and display them
app.get('/users/:username', (req, res) => {
    const { username } = req.params;
    
    try {
        const result = readUser({username});
        if (result.success) {
            if (result.data) {
                // Don't return password in response
                const { password, ...userWithoutPassword } = result.data;
                res.status(200).json(userWithoutPassword);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to Display all users currently in database.I Created this one for testing
app.get('/users', (req, res) => {
    const { username } = req.params;
    
    try {
        const result = showAllUsers();
        if (result.success) {
            if (result.data) {
                // Don't return password in response
                const { password, ...userWithoutPassword } = result.data;
                res.status(200).json(userWithoutPassword);
            } //else {
               // res.status(404).json({ error: 'User not found' });
           // }
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to delete a user from the database
app.delete('/users/:username', (req, res) => {
    const { username} = req.params;
    
    if (!username) {
        return res.status(400).json({ error: 'Username is required to delete user' });
    }
    
    try {
        const result = deleteUser({username});
        if (result.success) {
            if (result.changes > 0){
                res.status(200).json({message: "User deleted successfully"})
            }
        } else {
            res.status(404).json({ error: "User not found" });
        } 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

