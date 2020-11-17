import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { Flex } from '../features/Flex'
import { Menu } from '../features/Menu/Menu'
import { useDS } from '../hooks/useDS'
import { PageCss } from '../lib/styles'
import { sortByKey } from '../lib/utils'

const listCss = css`
  display: flex;
`

const templateItemCss = css`
  /* Item */
  -webkit-user-select: none;
  box-shadow: var(--box-shadow-sm);
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  transition: box-shadow 0.2s, transform 0.2s;

  /* Item link and hover */
  color: black;
  text-decoration-line: none;

  &:hover {
    box-shadow: var(--box-shadow-md);
  }

  /* Template Item */
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  border: 3px dashed rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  flex: 0 0 calc(150px * 0.71429);
  height: 150px;
  justify-content: center;
  max-width: calc(150px * 0.71429);
  padding: 0 0.8rem;

  & + & {
    margin-left: 1rem;
  }

  &:hover {
    transform: scale(1.1, 1.1);
  }
`

TemplatesPage.propTypes = {
  gameId: PropTypes.string.isRequired,
}

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.gameId ID of game to load
 * @example
 * const gameId = 'lCSYutJmUDI5qqgPYadC'
 * return (
 *   <TemplatesPage gameId={gameId} />
 * )
 */
export function TemplatesPage({ gameId }) {
  const Templates = useDS('Templates')

  const addTemplate = () => {
    const count = document.getElementsByClassName('template').length
    Templates.add({ name: `Template ${count}`, gameId })
    Templates.refresh('list')
  }

  useEffect(() => {
    Templates.getList({ gameId })
  }, [gameId])

  return (
    <>
      <Menu gameId={gameId} />

      <div class={PageCss}>
        <Flex justify="space-between">
          <h2>Templates</h2>
          <button onClick={addTemplate}>Add</button>
        </Flex>

        {/* Templates List */}
        <div class={listCss}>
          {Templates.list.sort(sortByKey('name')).map(template => (
            <a
              key={`templates-list-${template.$id}`}
              class={`template ${templateItemCss}`}
              href={`/games/${gameId}/templates/${template.$id}`}
            >
              {template.name}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
