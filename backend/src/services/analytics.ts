import { HoldingPosition, PortfolioSummary } from "../types/portfolio";
import { FundNavData } from "../types/sec-api";

export class PortfolioAnalyticsService {
    /**
     * คำนวณมูลค่าและผลตอบแทนรวม
     *  @param holding รายการหุ้น
     *  @param navMap Map ของ Nav ปัจจุบัน
     */
    public calculateSummary(
        holdings: HoldingPosition[],
        navMap: Map<string, FundNavData>
    ): PortfolioSummary {
        let totalCost = 0;
        let totalMarketValue = 0;

        for (const item of holdings) {
            const currentNav = navMap.get(item.fundId)?.last_val ?? item.avgCostPerUnit;

            const cost = item.units * item.avgCostPerUnit;
            const maketValue = item.units * currentNav;

            totalCost += cost;
            totalMarketValue += maketValue;
        }

        const unrealizedProfit = totalMarketValue - totalCost;
        const returnPercentage = totalCost > 0 ? (unrealizedProfit / totalCost) * 100 : 0;

        return {
            totalCost,
            totalMarketValue,
            unrealizedProfit,
            returnPercentage: Number(returnPercentage.toFixed(2)),
            lastUpdated: new Date(),
        };
    }
}