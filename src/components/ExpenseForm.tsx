import React from "react";
import { AiOutlineSend } from "react-icons/ai";

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}:{
    charge: string,
    amount: string,
    handleCharge: any,
    handleAmount: any,
    handleSubmit: any
    edit:  boolean


}): JSX.Element => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g. rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g. 100"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? "Edit" : "Submit"}
        <AiOutlineSend className="btn-icon" />
      </button>
      
    </form>
  );
};

export default ExpenseForm;
