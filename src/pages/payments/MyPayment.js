import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { jwtDecode } from "jwt-decode";
import "./MyPayments.css"

const MyPayment = () => {
  const [userEmail, setUserEmail] = useState("");
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const test = localStorage.getItem("jwtToken");
    const decodedToken = test ? jwtDecode(test) : null;
    setUserEmail(decodedToken ? decodedToken.email : "");
  }, []); 
  console.log(userEmail);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://localhost:7193/InvestmentInfo/${userEmail}`);
        console.log(response.data);
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setError(error.message || 'An error occurred while fetching payments.');
      } finally {
        setIsLoading(false);
      }
    };
    console.log("frommypaynet",payments);

    if (userEmail) {
      fetchPayments();
    }
  }, [userEmail]); 
  if (isLoading) {
    return <div>Loading payments...</div>;
  }
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  if (payments.length === 0) {
    return <div>No payments found for this user.</div>;
  }
  return (
    <div className="payment-table">
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Donated</th>
            <th>PID</th>
            <th>Project NAme</th>
            <th>Shares granted</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.invID}> 
              <td>{payment.invID}</td>
              <td>{payment.donated}</td>
              <td>{payment.pid}</td>
              <td>{payment.pname}</td>
              <td>{payment.shares}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPayment;
