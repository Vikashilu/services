import { getAllStock, getAllTrade, processInputAddTradeData, processInputRemoveTradeData } from "../api/databaseOpertaion";

export async function getPortfolio(req, rep) {
    try {
        const trades = await getAllTrade();
        const stocks = await getAllStock();

        const portfolio = trades.reduce((acc, trade) => {
            const stock = stocks.find((s) => s.id === trade.stock.id);
            if (!stock) return acc;
            const existingStock = acc[stock.symbol];
            if (existingStock) {
                existingStock.trades.push(trade);
            } else {
                acc[stock.symbol] = { stock, trades: [trade] };
            }
            return acc;
        }, {});
        return { success: true, data: portfolio }
    } catch (err) {
        return { success: false, data: err };
    }
}

export async function getHoldings(req, rep) {
    try {
        const trades = await getAllTrade();
        const stocks = await getAllStock();

        const holdings = stocks.reduce((acc, stock) => {
            const stockTrades = trades.filter((t) => t.stock.id === stock.id);
            const buyTrades = stockTrades.filter((t) => t.type === 'buy');
            const totalQuantity = buyTrades.reduce((sum, trade) => sum + trade.quantity, 0);
            const totalCost = buyTrades.reduce((sum, trade) => sum + trade.price * trade.quantity, 0);

            acc[stock.symbol] = {
                quantity: totalQuantity,
                averagePrice: totalCost / totalQuantity
            };
            return acc;
        }, {});
        return { success: true, data: holdings };
    } catch (err) {
        return { success: false, data: err };
    }
}

export async function getReturns(req, rep) {
    try {
        const holdingsResponse = await this.getHoldings();
        const holdingsData = holdingsResponse.data;
        const returns = Object.keys(holdingsData).reduce((acc, symbol) => {
            const holding = holdingsData[symbol];
            const initialPrice = holding.averagePrice;
            const finalPrice = 100; // Assuming the final Price
            const returnPercentage = ((finalPrice - initialPrice)) / initialPrice * 100;
            acc[symbol] = returnPercentage;
            return acc;
        }, {});
        return { success: true, data: returns };
    } catch (err) {
        return { success: false, data: err };
    }
}

export async function addTrade(request, reply) {
    if (!request?.body) {
        console.log("Add Trade request.body is null");
    }
    const addTradeResponse = await processInputAddTradeData(request.body);
    if (addTradeResponse.success) {
        reply.code(200).send(addTradeResponse);
    } else {
        reply.code(500).send(addTradeResponse);
    }

}

export async function updateTrade(request, reply) {
    if (!request?.body) {
        console.log("Update Trade request.body is null");
    }
    const updateTradeResponse = await processInputAddTradeData(request.body);
    if (updateTradeResponse.success) {
        reply.code(200).send(updateTradeResponse);
    } else {
        reply.code(500).send(updateTradeResponse);
    }
}

export async function removeTrade(request, reply) {
    if (!request?.body) {
        console.log("Delete Trade request.body is null");
    }
    const deleteTradeResponse = await processInputRemoveTradeData(request.body);
    if (deleteTradeResponse.success) {
        reply.code(200).send(deleteTradeResponse);
    } else {
        reply.code(500).send(deleteTradeResponse);
    }
}
