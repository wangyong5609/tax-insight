import { TaxBracket, TaxInput, TaxResult } from "@/types";

// 2024-2026 年个税税率表（年度）
const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 36000, rate: 0.03, quickDeduction: 0 },
  { min: 36000, max: 144000, rate: 0.1, quickDeduction: 2520 },
  { min: 144000, max: 300000, rate: 0.2, quickDeduction: 16920 },
  { min: 300000, max: 420000, rate: 0.25, quickDeduction: 31920 },
  { min: 420000, max: 660000, rate: 0.3, quickDeduction: 52920 },
  { min: 660000, max: 960000, rate: 0.35, quickDeduction: 85920 },
  { min: 960000, max: null, rate: 0.45, quickDeduction: 181920 },
];

// 基本减除费用（起征点）
const BASIC_DEDUCTION = 5000;

/**
 * 计算个人所得税
 */
export function calculateTax(input: TaxInput): TaxResult {
  const { monthlyIncome, socialInsurance, deductions } = input;

  // 计算专项附加扣除总额
  const totalDeductions = Object.values(deductions).reduce(
    (sum, val) => sum + (val || 0),
    0
  );

  // 应纳税所得额（月度）
  const monthlyTaxableIncome = Math.max(
    0,
    monthlyIncome - BASIC_DEDUCTION - socialInsurance - totalDeductions
  );

  // 年度应纳税所得额
  const annualTaxableIncome = monthlyTaxableIncome * 12;

  // 查找适用税率
  const bracket = TAX_BRACKETS.find(
    (b) =>
      annualTaxableIncome >= b.min &&
      (b.max === null || annualTaxableIncome < b.max)
  ) || TAX_BRACKETS[0];

  // 计算年度应缴税额
  const annualTax = Math.max(
    0,
    annualTaxableIncome * bracket.rate - bracket.quickDeduction
  );

  // 月度应缴税额
  const monthlyTax = annualTax / 12;

  // 税后收入
  const afterTaxIncome = monthlyIncome - socialInsurance - monthlyTax;

  return {
    taxableIncome: monthlyTaxableIncome,
    taxRate: bracket.rate,
    quickDeduction: bracket.quickDeduction,
    tax: monthlyTax,
    afterTaxIncome,
    annualTax,
  };
}

/**
 * 获取税率表
 */
export function getTaxBrackets(): TaxBracket[] {
  return TAX_BRACKETS;
}
