import { getRepository } from "typeorm";
import { Trade } from "../db/entity/Trade";
import { Portfolio } from "../db/entity/Portfolio";
import { Stock } from "../db/entity/Stock";

export async function processInputAddTradeData(inputData: Trade) {
    try {
        console.log("Proceed to load following data Trade DB " + JSON.stringify(inputData))
        await getRepository(Trade).save(inputData); // Save Function will do both things Insert as well as Update
        return { statusCode: 200, success: true, message: "Data Load successfully" };
    } catch (err) {
        console.log("Error loading data in Trade db" + err);
        return { statusCode: 610, success: false, message: err.message };
    }
}

export async function processInputRemoveTradeData(inputData: Trade) {
    try {
        let trade = new Trade();
        trade = await getTrade(inputData);
        if (trade) {
            console.log("Proceed to delete following data Trade DB " + JSON.stringify(inputData))
            const rows = await getRepository(Trade).createQueryBuilder()
                .delete()
                .from(Trade)
                .where(`id = '${inputData}'`)
                .execute();
            console.log("Trade data Delete from DB: " + JSON.stringify(rows.affected));
            if (rows.affected == 1) {
                return { statusCode: 200, success: true, message: "Data delete successfully" };
            }
        } else {
            return { statusCode: 404, success: false, message: "Data Doesn't Exist" };
        }
    } catch (err) {
        console.log("Error Deleting data in Trade db" + err);
        return { statusCode: 610, success: false, message: err.message };
    }
}

export async function getTrade(id) {
    try {
        const queryCondition = ` id='${id}'`;
        let row = await getRepository(Trade).createQueryBuilder()
            .where(`${queryCondition}`)
            .getOne();
        console.log("Trade Exist data: " + JSON.stringify(row));
        return row;
    }
    catch (err) {
        console.error("Error searching trade in db" + err);
        return err;
    }
}

export async function getPortfolioDb() {
    try {
        let row = await getRepository(Portfolio).createQueryBuilder()
            .getMany();
        console.log("Portfolio Exist data: " + JSON.stringify(row));
        return row;
    }
    catch (err) {
        console.error("Error searching portfolio in db" + err);
        return err;
    }
}

export async function getAllStock() {
    try {
        let row = await getRepository(Stock).createQueryBuilder()
            .getMany();
        console.log("Stock Exist data: " + JSON.stringify(row));
        return row;
    }
    catch (err) {
        console.error("Error searching stock in db" + err);
        return err;
    }
}

export async function getAllTrade() {
    try {
        let row = await getRepository(Trade).createQueryBuilder()
            .getMany();
        console.log("Trade Exist data: " + JSON.stringify(row));
        return row;
    }
    catch (err) {
        console.error("Error searching trade in db" + err);
        return err;
    }
}