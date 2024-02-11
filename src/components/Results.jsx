import '../Globals.css'

export default function Results({ winner }) {
  return (
    <div id="results-section">
      {winner ? `${winner} is the winner!` : "The game ended with no winners!"}
    </div>
  );
}
