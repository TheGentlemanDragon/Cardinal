import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { route } from 'preact-router'

export function Redirect({ to }) {
  useEffect(() => {
    route(this.props.to, true)
  }, [])

  return null
}
