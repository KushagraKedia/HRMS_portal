const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');      //__dirname -> the current folder where the JavaScript file exist


function readUsers() { 
    if (!fs.existsSync(DATA_FILE))  // if the file does not exist then  we are creating a new file with initial data as []
        fs.writeFileSync(DATA_FILE, '[]'); 
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')); // returning the data inside the file , json.parse() converts the JSON thing in the JS object
}


const protect = (req, res, next) => {
    try {
        const userId = req.headers['x-user-id']; //This reads a custom HTTP header.
        if (!userId) 
            return res.status(401).json({ error: 'Not authenticated. Please login.' });

        const users = readUsers(); // users variable get the data present inside the users.json file

        const user  = users.find(u => u.id === Number(userId));
        if (!user) 
            return res.status(401).json({ error: 'User not found.' });

        const { password: _, ...safeUser } = user;
        req.user = safeUser;
        next();
    } catch {
        res.status(500).json({ error: 'Auth check failed.' });
    }
};

// Only allows admins through
const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin')
        return res.status(403).json({ error: 'Admin access required.' });
    next();
};

module.exports = { 
    protect, 
    isAdmin 
};
