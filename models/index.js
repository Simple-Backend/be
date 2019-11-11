//IMPORTS
//const db = require('../data/dbConfig')

//EXPORTS
modules.exports = {
    //CREATE
    //:adds and returns new row to given table
    add_one: async (tbl, obj) => {
        return (await db(tbl).insert(obj).returning('*'))[0]
    },

    //READ
    //:returns a single row from the given table fitting a set of requirements
    get_one: async (tbl, obj) => {
        const user = await db(tbl).where(obj).first()
        return user
    },
    //:returns an array of all rows from a given table fitting a set of requirements
    get_all: async (tbl, obj) => {
        return await db(tbl).where(obj)
    },

    //UPDATE
    //:updates and returns a row with given id from the given table 
    update_one: async (tbl, id, obj) => {
        await db(tbl).where({id: id}).update(obj)
        return await get_one(tbl, {id: id})
    },

    //DELETE
    //:terminates a row with given id from the given table
    remove_one: async (tbl, id) => {
        const obj = get_one(tbl, {id: id})
        await db(tbl).where({id: id}).delete()
        return obj
    },
    //:terminate all rows from given table
    remove_all: async (tbl) => {
        return await db(tbl).delete()
    },
}