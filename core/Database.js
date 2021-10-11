import * as SQLite from 'expo-sqlite';
import type {Player} from "./Player";

const db = SQLite.openDatabase("quizPlayers.db");

export default class Database{

    static ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                    resolve(results);
                },
                (error) => {
                    reject(error);
                });
        });
    });

    static initializeDatabase() {
        console.log('1. create database');
        db.transaction(tx => {
                tx.executeSql(
                    "create table if not exists player (id integer primary key autoincrement not null,name text, score integer default 0);"
                );
            }, (e) => { console.log("-> create KO + " + e) },
            () => { console.log("-> create OK") }
        );
    }

    static clearDatabase(){
        console.log('CLEAR DATABASE');
        db.transaction(tx => {
                tx.executeSql(
                    "drop table if exists player;"
                );
            }, (e) => { console.log("-> create KO + " + e) },
            () => { console.log("-> create OK") }
        );
    }

    static async getPlayers() {
        console.log('3. get players');
        var results = [];
        await this.ExecuteQuery("SELECT * FROM player", []).then(
                (value) => {
                    console.log(JSON.stringify(value));
                    if(value.rows.length > 0) {
                        results = value.rows;
                    }
                },
                (reason) => {console.log(JSON.stringify(reason));}
            );
        console.log('4. players list length: '+ results.length);
        return results;
    };

    static async createPlayer(name: string) {
        console.log('6. create player : '+ name);
        let id = null;
        await this.ExecuteQuery("insert into player(name) values(?)", [name]).then(
            (value) => {
                console.log('-> insert OK');
                console.log(JSON.stringify(value));
                id = value.insertId;
            },
            (reason) => {
                console.log('-> insert KO');
                console.log(JSON.stringify(reason));
            }
        );
        return id;
    }

    static async updatePlayerScore(){

    }

    static async getPlayerById(id: number) {
        console.log('get player by '+id);
        var player = [];
        await this.ExecuteQuery("SELECT * FROM player where id=?", [id]).then(
            (value) => {
                console.log(JSON.stringify(value));
                /*if(value.rows.length > 0) {
                    result = value.rows;
                }*/
            },
            (reason) => {console.log(JSON.stringify(reason));}
        );
        //console.log('4. results length: '+results.length);
        //return results;
    }
}
