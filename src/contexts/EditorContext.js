import { useContextEx } from 'lib/context'

const defaults = {
  elementIndex: -1,
  scale: 2.0,
}

const [useEditorContext, withEditorContext] = useContextEx(defaults, 'Editor')

export { useEditorContext, withEditorContext }
