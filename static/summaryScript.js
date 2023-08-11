async function fetchTransactions() {
  const userId = 'user_id'; // TODO: Replace with actual user ID
  const response = await fetch(`/api/getRecentTransactions?userId=${userId}`);
  const transactions = await response.json();

  const recentTrans = document.getElementById('recentTrans');

  // Sort transactions by date in descending order
  transactions.sort((a, b) => new Date(b.dateOfTransaction) - new Date(a.dateOfTransaction));

  transactions.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.category}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.dateOfTransaction}</td>
    `;
    recentTrans.appendChild(row);
  });
}

// Call the function when the page loads
window.onload = fetchTransactions;
