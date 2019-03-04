import React from 'react';

const SessionsTable = ({ sessions }: any) => {
  const getRows = () => {
    if (sessions.length === 0) return <div>No sessions found</div>;
    console.log('from table component', sessions);
    return sessions.map((session: any) => (
      <div key={session.id.toString()}>
        <h2>Hall id: {session.hallId}</h2>
        <p>{session.date}</p>
        <span>{session.time}</span>
      </div>
    ));
  };
  return <div>{getRows()}</div>;
};

export default SessionsTable;
