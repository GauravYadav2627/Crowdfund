import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import "./InvestorInfp.css";

const InvestorInfo = () => {
  const [investors, setInvestors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestors = async () => {
      setError(null);

      try {
        const response = await axios.get('https://localhost:7193/InvestmentInfo'); 
        setInvestors(response.data);
      } catch (error) {
        console.error('Error fetching investors:', error);
        setError(error.message || 'An error occurred while fetching investors.');
      } 
    };

    fetchInvestors();
  }, []); 

  if (investors.length === 0) {
    return <div>No investors found.</div>;
  }

  return (
    <div className="investor-info-container">
      <h2>Investor Information</h2>
      <div className="investor-table">
        <table>
          <thead>
            <tr>
              <th>InvID</th>
              <th>UID</th>
              <th>PID</th>
              <th>Donated</th>
            </tr>
          </thead>
          <tbody>
            {investors.map((investor) => (
              <tr key={investor.invID}>
                <td>{investor.invID}</td>
                <td>{investor.uid}</td>
                <td>{investor.pid}</td>
                <td>{investor.donated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorInfo;
