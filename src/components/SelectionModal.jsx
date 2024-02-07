
import '../Globals.css'

export default function SelectionModal({ setIsOneSelected, handleSelection, number }) {

  return (
    <div className="selection-modal">
      <div>
        <button id='x-button' onClick={() => handleSelection('X', number)}>X</button>
        or
        <button id='o-button' onClick={() => handleSelection('O', number)}>O</button>
      </div>
      <button id='cancel-button' onClick={() => setIsOneSelected(false)}>Cancel</button>
    </div>
  );
}
