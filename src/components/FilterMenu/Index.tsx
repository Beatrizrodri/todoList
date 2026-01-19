import './style.css'

export type FilterType = 'all' | 'active' | 'completed' | 'deleted'

interface FilterMenuProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function FilterMenu({ currentFilter, onFilterChange }: FilterMenuProps) {
  const filters = [
    { id: 'all' as FilterType, label: 'Todas', icon: '📋' },
    { id: 'active' as FilterType, label: 'Ativas', icon: '⚡' },
    { id: 'completed' as FilterType, label: 'Completadas', icon: '✅' },
    { id: 'deleted' as FilterType, label: 'Deletadas', icon: '🗑️' }
  ]

  return (
    <div className="filter-menu">
      <h2 className="filter-menu-title">Filtros</h2>
      <div className="filter-menu-list">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-button ${
              currentFilter === filter.id ? 'active' : ''
            }`}
            onClick={() => onFilterChange(filter.id)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
