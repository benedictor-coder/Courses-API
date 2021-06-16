const {v4: uuidv4 } = require('uuid');

let users = [
    {
        "firstName": "Benedictor",
        "lastName": "Milimu",
        "age": 27
    },
    {
        "firstName": "Ann",
        "lastName": "Muhonja",
        "age": 27
    },
    {
        "firstName": "Brian",
        "lastName": "Amisi",
        "age": 27
    }
];

const getUsers = (req, res) => {
    console.log(users);
    res.send(users);
}

const createUser = (req, res) => {
    console.log("Post request made.");

    const user = req.body;

    const userId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const userWithId = { ...user, id: userId };

    users.push(userWithId);

    res.send(`New user with the name ${ user.firstName } was added to the database"`);
}

const getUserWithId = (req, res) => {

    console.log(req.params);

    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
} 

const deleteUserWithId = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send(`User with the id ${ id } deleted from the database`);
}

const updateUserInfo = (req, res) => {
    const { id } = req.params;

    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);


    if (firstName) {
        user.firstName = firstName;
    }

    if (lastName) {
        user.lastName = lastName;
    }

    if (age) {
        user.age = age;
    }

    res.send(`User with the id ${ id } has been updated`);
}

module.exports = {
    getUsers,
    createUser,
    getUserWithId,
    deleteUserWithId,
    updateUserInfo
}