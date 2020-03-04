#!/usr/bin/env node
/*
** EPITECH PROJECT, 2020
** my db
** File description:
** js
*/
//export class MyDB {}
const fs = require('fs').promises;

export default class myDb {
    constructor(json) {
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
}

/*async function main() {
    const db = {
        login: "Shinsei",
        passwd: "H4ck3rmAn",
    };
    const path = process.argv[2];
    let re = await myDb.load(path);
    console.log(re);
}

main();*/


