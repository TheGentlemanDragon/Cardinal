import { h } from 'preact'
import PropTypes from 'proptypes'

import TemplateList from 'components/TemplateList'

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
function GamePage({ gameId }) {
  return (
    <>
      <TemplateList gameId={gameId} />
    </>
  )
}

GamePage.propTypes = {
  gameId: PropTypes.string.isRequired,
}

export default GamePage
