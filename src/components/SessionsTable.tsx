import React from 'react';
import styled from 'styled-components';

import { greyColor, whiteColor, containerGreyColor } from './../constants';

const Container = styled.div`
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px ${greyColor};
  background: ${containerGreyColor};
  overflow: hidden;
`;

const TableRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  border-bottom: 1px solid ${greyColor};

  &:first-child {
    background: ${whiteColor};
    border-bottom: none;
    box-shadow: 0px -15px 16px 12px rgba(0, 0, 0, 0.75);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0.5rem 0;

  &&:not(:last-child) {
    border-right: 1px solid ${greyColor};
  }
`;

const SessionsTable = ({ sessions }: any) => {
  const getRows = () => {
    if (sessions.length === 0) return <div>No sessions found</div>;
    return sessions.map((session: any) => (
      <TableRow key={session.id.toString()}>
        <TableCell>
          <span>{session.city}</span>
        </TableCell>
        <TableCell>
          <span>{session.cinema}</span>
        </TableCell>
        <TableCell>
          <span>{session.date}</span>
          <span>{session.time}</span>
        </TableCell>
        <TableCell />
      </TableRow>
    ));
  };

  return (
    <Container>
      <TableRow>
        <TableCell>City</TableCell>
        <TableCell>Cinema</TableCell>
        <TableCell>Date and time</TableCell>
        <TableCell />
      </TableRow>
      {getRows()}
    </Container>
  );
};

export default SessionsTable;
