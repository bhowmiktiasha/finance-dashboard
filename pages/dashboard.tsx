// // pages/dashboard.tsx
// "use client";

// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import FinanceChart from '../components/FinanceChart';
// import axios from 'axios';
// import Head from 'next/head';

// interface FinanceData {
//   income: number;
//   expenses: number;
//   savings: number;
// }

// const fetchFinanceData = async () => {
//   const response = await axios.get('/api/finance/data');
//   return response.data;
// };

// const Dashboard = () => {
// //   const { data: session } = useSession();
//   const [financeData, setFinanceData] = useState<FinanceData | null>(null);

//   useEffect(() => {
//     // if (session) {
//       fetchFinanceData().then((data) => setFinanceData(data));
    
//   },
// //    [session]
// );

// //   if (!session) {
// //     return <p>You need to be authenticated to view this page.</p>;
// //   }

// //   if (!financeData) return <p>Loading...</p>;

//   return (
//     <>
//       <Head>
//         <title>Personal Finance Dashboard</title>
//         <meta name="description" content="Track your income, expenses, and savings" />
//       </Head>
//       <div>
//         <h1>Personal Finance Dashboard</h1>
//         <FinanceChart data={financeData} />
//         <p>Income: {financeData.income}</p>
//         <p>Expenses: {financeData.expenses}</p>
//         <p>Savings: {financeData.savings}</p>
//       </div>
//     </>
//   );
// };

// export default Dashboard;


"use client";


import FinanceChart from '../components/FinanceChart';
import ExpensePieChart from '../components/ExpensePieChart';
import SavingsLineChart from '../components/SavingsLineChart';
import StackedBarChart from '../components/StackedBarChart';
// import axios from 'axios';
import Head from 'next/head';

interface FinanceData {
  income: number;
  expenses: number;
  month: string;
}

// Interface for Expense Data
interface Expense {
  category: string;
  amount: number;
}

// Interface for Savings Data
interface Savings {
  month: string;
  amount: number;
}

// Interface for Stacked Data (Income vs Expenses)
interface StackedData {
  category: string;
  income: number;
  expenses: number;
}

const financeData: FinanceData[] = [
  { month: 'January', income: 5000, expenses: 3000 },
  { month: 'February', income: 4500, expenses: 3500 },
  { month: 'March', income: 6000, expenses: 4000 },
  { month: 'April', income: 7000, expenses: 2500 },
  { month: 'May', income: 8000, expenses: 5000 },
];


const expenseData: Expense[] = [
  { category: 'Rent', amount: 1200 },
  { category: 'Groceries', amount: 400 },
  { category: 'Entertainment', amount: 150 },
  { category: 'Utilities', amount: 250 },
];

const savingsData: Savings[] = [
  { month: 'January', amount: 1000 },
  { month: 'February', amount: 1200 },
  { month: 'March', amount: 1500 },
  { month: 'April', amount: 2000 },
];

const stackedData: StackedData[] = [
  { category: 'January', income: 3000, expenses: 2000 },
  { category: 'February', income: 2500, expenses: 2200 },
  { category: 'March', income: 2800, expenses: 2300 },
];


// const fetchFinanceData = async () => {
//   const response = await axios.get('/api/finance/data');
//   return response.data;
// };

const Dashboard = () => {
  // const [financeData, setFinanceData] = useState<FinanceData | null>(null);

  // useEffect(() => {
  //   fetchFinanceData().then((data) => setFinanceData(data));
  // }, []);

  return (
    <>
      <Head>
        <title>Personal Finance Dashboard</title>
        <meta name="description" content="Track your income, expenses, and savings" />
      </Head>
      <div style={{margin: "auto"}}>
      <h5 style={{textAlign: "center" , fontSize: "30px"}}>Personal Finance Dashboard</h5>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>


  <section >
    <h2>Stream Graph: Income vs Expenses</h2>
    <FinanceChart data={financeData} />
    <ul>
      {financeData.map((data, index) => (
        <li key={index}>
          {data.month} - Income: ${data.income}, Expenses: ${data.expenses}
        </li>
      ))}
    </ul>
  </section>

  <section >
    <h2>Pie Chart: Expense Breakdown</h2>
    <ExpensePieChart data={expenseData} />
    <ul>
      {expenseData.map((expense, index) => (
        <li key={index}>
          {expense.category}: ${expense.amount}
        </li>
      ))}
    </ul>
  </section>

  <section>
    <h2>Line Chart: Savings Over Time</h2>
    <SavingsLineChart data={savingsData} />
    <ul>
      {savingsData.map((saving, index) => (
        <li key={index}>
          {saving.month}: ${saving.amount}
        </li>
      ))}
    </ul>
  </section>

  <section>
    <h2>Stacked Bar Chart: Income vs Expenses</h2>
    <StackedBarChart data={stackedData} />
    <ul>
      {stackedData.map((data, index) => (
        <li key={index}>
          {data.category} - Income: ${data.income}, Expenses: ${data.expenses}
        </li>
      ))}
    </ul>
  </section>
</div>

    </>
    
  );
};

export default Dashboard;
