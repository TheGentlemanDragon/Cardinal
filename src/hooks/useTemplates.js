import { useEffect, useState } from 'preact/hooks'
import { Firebase } from 'lib/data'

const cached = {}

export default function useTemplates(game, invalidate = false) {
  const [data, setData] = useState([])

  useEffect(
    () =>
      (async function() {
        if (!cached[game.$id] || invalidate) {
          cached[game.$id] = await Firebase.query(
            'templates',
            { gameRef: game.$ref },
            'name'
          )
        }
        setData(await cached[game.$id])
      })(),
    [game, invalidate]
  )

  return data
}
