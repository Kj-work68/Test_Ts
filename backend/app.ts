import express, {Request, Response} from 'express';
import {GenericApiClient} from './src/services/apiClient';
import {PortfolioAnalyticsService} from './src/services/analytics';
import { HoldingPosition } from './src/types/portfolio';
import { FundNavData } from './src/types/sec-api';

const app = express();
app.use(express.json());
const PORT = 3000;

const analyticsService = new PortfolioAnalyticsService();

const mockUserHoldings: HoldingPosition[] = [
    { fundId: 'M001', fundName: 'K-CHANGE-A', units: 1000, avgCostPerUnit: 10.5},
    { fundId: 'M002', fundName: 'SCBPLEDGE', units: 500, avgCostPerUnit: 15.0},
]

app.get('/api/v1/portfolio/summary', async (req: Request, res: Response) => {
  try {
    // Mock ข้อมูล NAV ล่าสุด
    const mockNavMap = new Map<string, FundNavData>([
      ['M001', { proj_id: 'M001', fund_name_en: 'K-CHANGE-A', nav_date: '2026-09-07', net_asset: 1000000, last_val: 12.2 }],
      ['M002', { proj_id: 'M002', fund_name_en: 'SCBPLEDGE', nav_date: '2026-09-07', net_asset: 2000000, last_val: 14.8 }],
    ]);

    const summary = analyticsService.calculateSummary(mockUserHoldings, mockNavMap);

    res.json({
      status: 'success',
      data: summary,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: (error as Error).message });
  }
});

app.listen(PORT, () => {
    console.log(`Portfolio Analytics API running on http://localhost:${PORT}`)
})