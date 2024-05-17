import { FastifyInstance } from "fastify";
import metricsPlugin from 'fastify-metrics';
import { addTrade, getHoldings, getPortfolio, getReturns, removeTrade, updateTrade } from "../handler/tradehandler";
import removeTradeInfo from "../api/deleteTradeInfo.schema.json";

export async function registerRoutes(fastify: FastifyInstance, opts, done) {

  //liveness probe
  fastify.get(`/liveness`, async (req, rep) => {
    return "OK";
  });

  //readiness probe
  fastify.get(`/readiness`, async (req, rep) => {
    return "OK";
  });

  //get metrics
  fastify.register(metricsPlugin, { endpoint: '/metrics' });

  // Get Portfolio
  fastify.get(`/portfolio/`, getPortfolio );

  // Get Holdings in an aggregate view
  fastify.get(`/holdings`, getHoldings );

  // Get Returns
  fastify.get(`/returns`, getReturns );
//  Add Trade
  fastify.post(`/addTrade`, addTrade);
// Update Trade
  fastify.post(`/updateTrade`, updateTrade);
// Remove Trade
  fastify.post(`/removeTrade`,{ schema: { body: removeTradeInfo } } ,removeTrade);
}