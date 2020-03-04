#!/usr/bin/env node
/*
** EPITECH PROJECT, 2020
** my db
** File description:
** js
*/
//export class MyDB {}
const fs = require('fs').promises;

const schemaUsers = {
    users: [],
    passwd: [],
};

/*export default */class myDb {
    constructor(json) {
        json = schemaUsers;
        this.json = json;
    }
    async save(path) {
        await fs.writeFile(path, JSON.stringify(this.json), 'utf-8');
    }
    static async load(path) {
        let data = await fs.readFile(path,'utf-8');
        data = JSON.parse(data);
        return (new myDb(data));
    }
    async createUser(firstname, lastname) {
        if (this.json.users.filter(data => (data.firstname === firstname) && (data.lastname === lastname)).length  === 1) {
            console.error("Already exist");
            return;
        }
        const user = {
            firstname: firstname,
            lastname: lastname,
        };
        this.json.users.push(user);
        return (user);
    }
    async getUser(id) {
        if (!this.json.users[id]) {
            console.error("This id isn't exist");
            return;
        } else return (this.json.users[id]);
    }
    async updateUser(id, firstname, lastname) {
        if (!this.json.users[id]) {
            console.error("This id isn't exist");
            return;
        }
        else if (this.json.users.filter(data => (data.firstname === firstname) && (data.lastname === lastname)).length  === 1) {
            console.error("Already exist");
            return;
        }
        else {
            this.json.users[id].firstname = firstname;
            this.json.users[id].lastname = lastname;
            return (this.json.users[id]);
        }
    }
    async deleteUser(id) {
        if (!this.json.users[id]) {
            console.error("This id isn't exist");
            return;
        }
        return (this.json.users.splice(id, 1));
    }
}

/*async function main() {
    let re = new myDb;
    await re.createUser("Killian", "Fleury");
    await re.createUser("Edouard", "Sen");
    await re.createUser("Olivier", "Mzi");
    await re.createUser("Tom", "Tbn");
    await re.updateUser(1, "Maxime", "Dodin");
    await re.deleteUser(60);
    console.log(re.json.users);
    console.log();
}

main();*/


