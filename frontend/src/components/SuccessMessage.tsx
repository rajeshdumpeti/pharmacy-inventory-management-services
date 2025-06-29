import React from 'react';

const SuccessMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="mb-4 p-3 rounded bg-green-100 text-green-800 border border-green-300 text-center">
    {message}
  </div>
);

export default SuccessMessage;
