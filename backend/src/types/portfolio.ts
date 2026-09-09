export interface HoldingPosition {
    fundId:string;
    fundName: string;
    units: number;
    avgCostPerUnit: number;
}

export interface PortfolioSummary {
    totalCost: number;
    totalMarketValue: number;
    unrealizedProfit: number;
    returnPercentage: number;
    lastUpdated: Date;
}
