
import '../Globals.css'

export default function SelectionModal({ setIsOneSelected, setIsX, setIsFilled }) {

  function handleX() {
    setIsX(true)
    setIsFilled(true)
    setIsOneSelected(false)
  }

  function handleO() {
    setIsX(false)
    setIsFilled(true)
    setIsOneSelected(false)
  }

  return (
    <div className="selection-modal">
      <div>
        <button id='x-button' onClick={handleX}>X</button>
        or
        <button id='o-button' onClick={handleO}>O</button>
      </div>
      <button id='cancel-button' onClick={() => setIsOneSelected(false)}>Cancel</button>
    </div>
  );
}
