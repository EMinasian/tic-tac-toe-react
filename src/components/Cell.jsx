import { useState } from "react";
import '../Globals.css'

export default function Cell() {
  const [isFilled, setIsFilled] = useState(false);
  const [isX, setIsX] = useState(false);
  return <div className="board-cell">{isFilled && (isX ? "X" : "O")}</div>;
}
