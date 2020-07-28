import { useContextEx } from 'lib/context'

const defaults = {
  scale: 2.0,
  elementIndex: -1,
}

const [useEditorContext, withEditorContext] = useContextEx(defaults, 'Editor')

export { useEditorContext, withEditorContext }
