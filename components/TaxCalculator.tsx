"use client";

import { useState } from "react";
import { calculateTax } from "@/lib/tax-calculator";
import { TaxDeductions } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Calculator, TrendingUp, Wallet } from "lucide-react";

export function TaxCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(15000);
  const [socialInsurance, setSocialInsurance] = useState(2000);
  const [deductions, setDeductions] = useState<Partial<TaxDeductions>>({
    childEducation: 0,
    housingLoan: 0,
    elderCare: 0,
  });

  const result = calculateTax({ monthlyIncome, socialInsurance, deductions });

  const handleDeductionChange = (key: keyof TaxDeductions, value: number) => {
    setDeductions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">个人所得税计算器</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            月收入 (元)
          </label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            五险一金 (元)
          </label>
          <input
            type="number"
            value={socialInsurance}
            onChange={(e) => setSocialInsurance(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            专项附加扣除
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={deductions.childEducation === 2000}
                onChange={(e) =>
                  handleDeductionChange("childEducation", e.target.checked ? 2000 : 0)
                }
                className="rounded"
              />
              <span className="text-sm">子女教育 (2000元/月)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={deductions.housingLoan === 1000}
                onChange={(e) =>
                  handleDeductionChange("housingLoan", e.target.checked ? 1000 : 0)
                }
                className="rounded"
              />
              <span className="text-sm">住房贷款利息 (1000元/月)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={deductions.elderCare === 3000}
                onChange={(e) =>
                  handleDeductionChange("elderCare", e.target.checked ? 3000 : 0)
                }
                className="rounded"
              />
              <span className="text-sm">赡养老人 (3000元/月)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-lg mb-3">计算结果</h3>

        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-muted-foreground">应纳税所得额</span>
          <span className="font-semibold">{formatCurrency(result.taxableIncome)}</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <span className="text-muted-foreground">适用税率</span>
          <span className="font-semibold">{(result.taxRate * 100).toFixed(0)}%</span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-border/50">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span className="text-muted-foreground">月度个税</span>
          </div>
          <span className="font-bold text-orange-500 text-lg">{formatCurrency(result.tax)}</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-green-500" />
            <span className="text-muted-foreground">税后月收入</span>
          </div>
          <span className="font-bold text-green-500 text-xl">{formatCurrency(result.afterTaxIncome)}</span>
        </div>

        <div className="pt-3 mt-3 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">年度预估个税</span>
            <span className="font-semibold text-orange-500">{formatCurrency(result.annualTax)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
