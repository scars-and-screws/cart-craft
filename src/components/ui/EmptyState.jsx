/**
 * EmptyState - Reusable component for empty/error states
 * @param {string} title - Main message
 * @param {string} subtitle - Secondary message (optional)
 * @param {string} actionLabel - Button text (optional)
 * @param {function} onAction - Button click handler (optional)
 */
const EmptyState = ({ title, subtitle, actionLabel, onAction }) => {
  return (
    <div className='text-center py-12 border border-neutral-200 rounded-lg bg-white'>
      <p className='text-neutral-900 font-medium'>{title}</p>
      {subtitle && <p className='text-neutral-500 text-sm mt-1'>{subtitle}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className='mt-4 px-4 py-2 text-sm bg-neutral-900 text-white rounded-md hover:bg-neutral-800'
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
