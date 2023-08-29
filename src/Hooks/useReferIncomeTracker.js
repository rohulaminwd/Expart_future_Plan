import { useState, useEffect } from "react";

const useReferIncomeTracker = (incomeData) => {
  const [todayCommission, setTodayCommission] = useState(0);

  const [monthlyCommission, setMonthlyCommission] = useState(0);
  const [commission, setCompanyBunas] = useState(0);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayIncomeData = incomeData?.filter(
      (income) => new Date(income.date).toDateString() === today.toDateString()
    );

    const monthlyIncomeData = incomeData?.filter(
      (income) =>
        new Date(income.date) >
        new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    );

    const calculateTotalIncome = (incomeData) =>
      incomeData?.reduce((total, income) => total + income?.amount, 0);

    setTodayCommission(calculateTotalIncome(todayIncomeData));
    setMonthlyCommission(calculateTotalIncome(monthlyIncomeData));
    setCompanyBunas(calculateTotalIncome(incomeData));
  }, [incomeData]);

  return {
    todayCommission,
    monthlyCommission,
    commission,
  };
};

export default useReferIncomeTracker;
