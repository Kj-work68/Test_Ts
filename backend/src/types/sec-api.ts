export interface FundNavData {
    proj_id: string;
    fund_name_en: string;
    nav_date: string;
    net_asset: number;
    last_val: number;
}

export interface FundAssetAllocation {
    asset_name: string;
    ratio: number;
}