import { h } from 'preact'
import PropTypes from 'proptypes'

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.gameId ID of game to load
 * @example
 * const gameId = 'lCSYutJmUDI5qqgPYadC'
 * return (
 *   <Game gameId={gameId} />
 * )
 */
function Game({ gameId }) {
  return <div>Game Page ({gameId})</div>
}

Game.propTypes = {
  gameId: PropTypes.string.isRequired,
}

export default Game
