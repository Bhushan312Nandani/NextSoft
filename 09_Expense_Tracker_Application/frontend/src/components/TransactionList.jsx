import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Trash2 } from 'lucide-react';

export default function TransactionList() {
  const { transactions, getTransactions, deleteTransaction } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => {
          const sign = transaction.amount < 0 ? '-' : '+';
          return (
            <li key={transaction._id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
              <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">
                <Trash2 size={18} />
              </button>
              <span style={{ marginLeft: '30px' }}>{transaction.text}</span>
              <span>{sign}${Math.abs(transaction.amount)}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
