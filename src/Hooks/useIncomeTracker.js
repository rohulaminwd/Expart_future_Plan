import { useState, useEffect } from 'react';

const useIncomeTracker = (incomeData) => {
  const [yesterdayIncome, setYesterdayIncome] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayIncomeData = incomeData?.filter(income => new Date(income.date).toDateString() === today.toDateString());
    const yesterdayIncomeData = incomeData?.filter(income => new Date(income.date).toDateString() === yesterday.toDateString());
    const weeklyIncomeData = incomeData?.filter(income => new Date(income.date) > new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
    const monthlyIncomeData = incomeData?.filter(income => new Date(income.date) > new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()));

    const calculateTotalIncome = (incomeData) => incomeData?.reduce((total, income) => total + income.price, 0);

    setYesterdayIncome(calculateTotalIncome(yesterdayIncomeData));
    setTodayIncome(calculateTotalIncome(todayIncomeData));
    setWeeklyIncome(calculateTotalIncome(weeklyIncomeData));
    setMonthlyIncome(calculateTotalIncome(monthlyIncomeData));
  }, [incomeData]);

  return { yesterdayIncome, todayIncome, weeklyIncome, monthlyIncome };
};

export default useIncomeTracker;
