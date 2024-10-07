// import { NextApiRequest, NextApiResponse } from 'next';

// let financeData = {
//   income: 5000,
//   expenses: 3000,
//   savings: 2000,
// };

// // const expenses = [
// //   { category: 'Rent', amount: 1200 },
// //   { category: 'Groceries', amount: 400 },
// //   { category: 'Entertainment', amount: 150 },
// //   { category: 'Utilities', amount: 200 },
// // ];

// // const savings = [
// //   { month: 'January', amount: 1000 },
// //   { month: 'February', amount: 1200 },
// //   { month: 'March', amount: 1500 },
// //   { month: 'April', amount: 2000 },
// // ];

// // const stacked = [
// //   { category: 'January', income: 3000, expenses: 2000 },
// //   { category: 'February', income: 2500, expenses: 2200 },
// //   { category: 'March', income: 2800, expenses: 2300 },
// // ];

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'GET') {
//     // Return current financial data
//     res.status(200).json({
//       financeData,
//       // expenses,
//       // savings,
//       // stacked,
//     });
//   } else if (req.method === 'POST') {
//     const { income, expenses: updatedExpenses, savings: updatedSavings } = req.body;

//     // Validate incoming data (ensure income, expenses, and savings are numbers)
//     if (typeof income !== 'number' || typeof updatedExpenses !== 'number' || typeof updatedSavings !== 'number') {
//       res.status(400).json({ error: 'Invalid input data' });
//       return;
//     }

//     // Update financeData
//     financeData = {
//       income,
//       expenses: updatedExpenses,
//       savings: updatedSavings,
//     };

//     res.status(200).json({ financeData });
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// };
