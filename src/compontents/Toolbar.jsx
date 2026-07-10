export default function Toolbar({ filter, onFilterChange, onClearCompleted, disableClear }) {
    return (
        <div className="toolbar">
            <div className="filter">
                <button 
                    type="button"
                    className={filter === 'all' ? 'black' : ''}
                    onClick={() => onFilterChange('all')}
                >
                    Mind
                </button>

                <button 
                    type="button"
                    className={filter === 'active' ? 'black' : ''}
                    onClick={() => onFilterChange('active')}
                >
                    Aktív
                </button>

                <button 
                    type="button"
                    className={filter === 'done' ? 'black' : ''}
                    onClick={() => onFilterChange('done')}
                >
                    Kész
                </button>
            </div>

            <button 
                type="button"
                className="clear-btn"
                disabled={disableClear}
                onClick={onClearCompleted}
            >
                Kész feladatok törlése
            </button>
        </div>
    )
}