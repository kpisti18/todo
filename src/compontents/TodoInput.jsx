export default function TodoInput({ value, onChange, onAdd, onKeyDown }) {
    return (
        <div className="input-row">
            <input 
                type="text"
                placeholder="Új feladat hozzáadása..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
            />

            <button type="button" onClick={onAdd}>Hozzáad</button>
        </div>
    )
}