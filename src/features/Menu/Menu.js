import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { css } from 'linaria'

import { EditorPanel } from './EditorPanel'
import { ElementPanel } from './ElementPanel'
import { FlexSeparator } from '../FlexSeparator'
import { ScaleSlider } from '../ScaleSlider'
import { SelectCollection } from '../SelectCollection'
import { Title } from '../Title'

import { useEditorContext } from '../../contexts/EditorContext'
import { useDS } from '../../hooks/useDS'
import { openEditorTemplate } from '../../lib/actions'
import { DataStore } from '../../lib/datastore'

const MenuCss = css`
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 210px;

  label {
    margin-bottom: var(--margin-sm);
  }

  input:not(:last-of-type) {
    margin-bottom: var(--margin-md);
  }

  a {
    border-bottom: 1px solid var(--clr-white-10);
    padding: var(--margin-md);

    h1 {
      margin: 0;
    }
  }

  > div {
    border-bottom: 1px solid var(--clr-white-10);
    margin: 0;
    padding: var(--margin-md) var(--padding-vertical);
  }
`

Menu.defaultProps = {}

/** List games for the main page */
export function Menu({ gameId, templateId }) {
  const Templates = useDS('Templates')
  const { elementIndex, elements, $set, template } = useEditorContext()

  const element = elements?.[elementIndex]

  useEffect(() => {
    if (!templateId) {
      return
    }

    Templates.getItem(templateId)
  }, [templateId])

  useEffect(() => {
    if (!Templates.item) {
      return
    }
    $set.template(Templates.item)
  }, [Templates.item])

  const updateElement = partial => {
    const newElement = { ...element, ...partial }
    DataStore.Elements.set(element?.$id, newElement)
    $set.elements(Object.assign([], elements, { [elementIndex]: newElement }))
  }

  return (
    <div class={MenuCss}>
      <Title />

      {gameId && (
        <SelectCollection
          collection="Games"
          labelKey="name"
          name="Game"
          value={gameId}
          valueKey="$id"
          onSelect={game => openEditorTemplate(game.$id)}
        />
      )}

      {template && (
        <SelectCollection
          collection="Templates"
          labelKey="name"
          name="Template"
          query={{ gameId }}
          value={Templates.item?.name}
          onSelect={template => openEditorTemplate(gameId, template.$id)}
        />
      )}

      {template && <EditorPanel gameId={gameId} templateId={templateId} />}

      {element && <ElementPanel element={element} setElement={updateElement} />}

      <FlexSeparator />

      <ScaleSlider />
    </div>
  )
}
