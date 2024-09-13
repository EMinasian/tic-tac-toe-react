import React, { ReactNode } from 'react';
import '../Globals.css'

export default function ResultsMessage({ winner }: { winner: string }): ReactNode {
  return (
    <div id="results-section">
      {winner ? `${winner} is the winner!` : "The game ended with no winners!"}
    </div>
  );
}
