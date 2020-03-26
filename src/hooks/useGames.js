import { useEffect, useState } from 'preact/hooks'
import { Firebase } from 'lib/data'

let cached

export default function useGames(invalidate = false) {
  const [games, setGames] = useState([])

  useEffect(
    () =>
      (async function() {
        if (!cached || invalidate) {
          cached = Firebase.list('games', 'name')
        }
        setGames(await cached)
      })(),
    [invalidate]
  )

  return games
}
