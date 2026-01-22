// 新闻相关类型
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  tags: string[];
  content?: string;
}

// 个税计算相关类型
export interface TaxDeductions {
  childEducation: number; // 子女教育
  continuingEducation: number; // 继续教育
  medicalExpenses: number; // 大病医疗
  housingLoan: number; // 住房贷款利息
  housingRent: number; // 住房租金
  elderCare: number; // 赡养老人
  infantCare: number; // 3岁以下婴幼儿照护
}

export interface TaxInput {
  monthlyIncome: number; // 月收入
  socialInsurance: number; // 五险一金
  deductions: Partial<TaxDeductions>; // 专项附加扣除
}

export interface TaxResult {
  taxableIncome: number; // 应纳税所得额
  taxRate: number; // 适用税率
  quickDeduction: number; // 速算扣除数
  tax: number; // 应缴个税
  afterTaxIncome: number; // 税后收入
  annualTax: number; // 年度预估
}

// 税率表
export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  quickDeduction: number;
}
