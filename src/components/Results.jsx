export default function Results({ winner }) {
  return (
    <div>
      {winner ? `${winner} is the winner!` : "The game ended with no winners!"}
    </div>
  );
}
