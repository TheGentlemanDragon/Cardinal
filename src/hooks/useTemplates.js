import { useEffect, useState } from 'preact/hooks'
import { Firebase } from 'lib/data'

const cached = {}

export default function useTemplates(gameId, invalidate = false) {
  const [data, setData] = useState([])

  useEffect(
    () =>
      (async function() {
        if (!cached[gameId] || invalidate) {
          cached[gameId] = await Firebase.query(
            'templates',
            { gameRef: `/games/${gameId}` },
            'name'
          )
        }
        setData(await cached[gameId])
      })(),
    [gameId, invalidate]
  )

  return data
}
