import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'

import { Flex } from '../components/Flex'
import { FlexSeparator } from '../components/FlexSeparator'
import { ScaleSlider } from '../components/ScaleSlider'
import { SelectCollection } from '../components/SelectCollection'
import { Title } from '../components/Title'
import { DataStore } from '../lib/datastore'

import { useEditorContext } from '../contexts/EditorContext'

const MenuCss = css`
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 var(--g-padding-vertical) var(--g-padding-vertical);
  width: 210px;

  > div {
    height: 100%;
  }
`

Menu.defaultProps = {}

/** List games for the main page */
export function Menu({ gameId, templateId }) {
  const { set, template } = useEditorContext()

  useEffect(() => {
    if (!templateId) {
      return
    }

    DataStore.Templates(templateId).then(set.template)
  }, [templateId])

  return (
    <div class={MenuCss}>
      <Flex direction="column">
        <Title />

        {gameId && (
          <SelectCollection
            collection="Games"
            labelKey="name"
            name="Game"
            value={gameId}
            valueKey="$id"
            onSelect={item => openEditorTemplate(item)}
          />
        )}

        {template && (
          <SelectCollection
            collection="Templates"
            labelKey="name"
            name="Template"
            query={{ gameId }}
            value={template.name}
            onSelect={item => openEditorTemplate(game, item)}
          />
        )}

        {/* <EditorPanel gameId={gameId} templateId={templateId} /> */}

        <FlexSeparator />

        <ScaleSlider />
      </Flex>
    </div>
  )
}
