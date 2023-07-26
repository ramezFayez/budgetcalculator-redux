import ExpenseList from "./ExpenseList";

type Props = {
  expenses: any[];
  clearItems: (...args: any[]) => any;
  handleDelete: (...args: any[]) => any;
  handleEdit: (...args: any[]) => any;
};
const Report = () => {
  return (
    <div>
      <ExpenseList />
    </div>
  );
};

export default Report;
