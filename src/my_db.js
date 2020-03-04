#!/usr/bin/env node
/*
** EPITECH PROJECT, 2020
** my db
** File description:
** js
*/
const fs = require('fs').promises;

const schemaUsers = {
    users: [],
    account: [],
};

/*export default */
class myDb {
    constructor(json) {
        this.json = json;
    }

    static async load(path) {
        let data = await fs.readFile(path, 'utf-8');
        data = JSON.parse(data);
        return (new myDb(data));
    }

    async save(path) {
        await fs.writeFile(path, JSON.stringify(this.json), 'utf-8');
    }

    async createUser(firstname, lastname) {
        if (this.json.users.filter(data => (data.firstname === firstname) && (data.lastname === lastname)).length === 1) {
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

        } else return (this.json.users[id]);
    }

    async updateUser(id, firstname, lastname) {
        if (!this.json.users[id]) {
            console.error("This id isn't exist");

        } else if (this.json.users.filter(data => (data.firstname === firstname) && (data.lastname === lastname)).length === 1) {
            console.error("Already exist");

        } else {
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

    async createAccount(owner, initialBalance) {
        if ((isNaN(initialBalance) === true) || (initialBalance <= 0)) {
            console.error("InitialBalance is undefined");
            return;
        }
        if (!this.json.users[owner]) {
            console.error("This id isn't exist");
            return;
        }
        if (this.json.account.filter(data => data.owner_id === owner).length === 1) {
            console.error("You already got an account");
            return;
        }
        const account = {
            owner_id: owner,
            initialBalance: initialBalance,
        };
        return (this.json.account.push(account));
    }

    async getAccount(id) {
        if (this.json.account.length - 1 < id) {
            console.error("This id isn't exist");
            return;
        }
        let item = 0;
        for (item in this.json.account) {
            if (this.json.account[item].owner_id === id) {
                break;
            }
        }
        return (this.json.account[item]);
    }

    async creditAccount(id, amount) {
        if (this.json.account.length - 1 < id) {
            console.error("This id isn't exist");
            return;
        }
        let item = 0;
        for (item in this.json.account) {
            if (this.json.account[item].owner_id === id) {
                break;
            }
        }
        if (amount <= 0) {
            console.error("You can't add >= 0");
            return;
        }
        return (this.json.account[item].initialBalance = this.json.account[item].initialBalance + amount);
    }

    async withdrawAccount(id, amount) {
        if (this.json.account.length - 1 < id) {
            console.error("This id isn't exist");
            return;
        }
        let item = 0;
        for (item in this.json.account) {
            if (this.json.account[item].owner_id === id) {
                break;
            }
        }
        if (amount <= 0) {
            console.error("You can't add >= 0");
            return;
        }
        return (this.json.account[item].initialBalance = this.json.account[item].initialBalance - amount);
    }

    async deleteAccount(id) {
        if (this.json.account.length - 1 < id) {
            console.error("This id isn't exist");
            return;
        }
        let item = 0;
        for (item in this.json.account) {
            if (this.json.account[item].owner_id === id) {
                break;
            }
        }
        return (this.json.account.splice(item, 1));
    }
}

async function Users(re) {
    await re.createUser("Killian", "Fleury");
    await re.createUser("Edouard", "Sen");
    await re.createUser("Olivier", "Mzi");
    await re.createUser("Tom", "Laqueue");
    await re.updateUser(1, "Maxime", "Dodin");
}

async function Account(re) {
    await re.createAccount(1, 10000);
    await re.createAccount(0, 10000);
    await re.creditAccount(0, 5000);
    await re.withdrawAccount(0, 2500);
}

/*async function main() {
    let re = new myDb(schemaUsers);
    await Users(re);
    await Account(re);
    console.log(re.json.account);
}

main();*/


