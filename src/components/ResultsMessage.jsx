import '../Globals.css'

export default function ResultsMessage({ winner }) {
  return (
    <div id="results-section">
      {winner ? `${winner} is the winner!` : "The game ended with no winners!"}
    </div>
  );
}
