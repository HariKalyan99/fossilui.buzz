const DinoLoader = ({ compact = false, className = '' }) => {
  const classes = ['dino-loader', compact ? 'dino-loader--compact' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="status" aria-label="Loading">
      <div className="dino-runner"></div>
      <div className="dino-obstacle"></div>
      <div className="dino-ground"></div>
    </div>
  )
}

export default DinoLoader