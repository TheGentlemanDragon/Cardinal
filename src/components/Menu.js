import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'

import { Flex } from '../components/Flex'
import { FlexSeparator } from '../components/FlexSeparator'
import { ScaleSlider } from '../components/ScaleSlider'
import { SelectCollection } from '../components/SelectCollection'
import { DataStore } from '../lib/datastore'

import { useEditorContext } from '../contexts/EditorContext'

const MenuCss = css`
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: var(--g-padding-vertical) var(--g-padding-vertical);
  width: 210px;

  > div {
    height: 100%;
  }
`

const titleCss = css`
  color: #fff;
  font-size: 2rem;
  font-weight: 400;
  line-height: 2rem;
  margin-bottom: var(--g-margin-lg);
  text-align: center;
  text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.6);
  top: var(--g-padding-vertical);
`

const offsetTitleCss = css`
  left: 45.5px;
  position: absolute;
`

Menu.defaultProps = {
  titleOnly: false,
}

/** List games for the main page */
export function Menu({ gameId, templateId, titleOnly }) {
  const { set, template } = useEditorContext()

  useEffect(() => {
    if (titleOnly || !templateId) {
      return
    }

    DataStore.Templates(templateId).then(set.template)
  }, [templateId])

  return titleOnly ? (
    <h1 class={`${offsetTitleCss} ${titleCss} `}>Cardinal</h1>
  ) : (
    <div class={MenuCss}>
      <Flex direction="column">
        <h1 class={titleCss}>Cardinal</h1>

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
