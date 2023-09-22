import React, {
  useRef,
  useCallback,
  useEffect,
} from 'react'

export default (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback)
  const timmerId = useRef({ id: 0 })

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const play = useCallback(() => {
    if (delay === null) {
      return
    }
    timmerId.current.id = setInterval(() => savedCallback.current(), delay)
  }, [delay])

  const clear = useCallback(() => {
    clearInterval(timmerId.current.id)
  }, [timmerId])

  useEffect(() => {
    play()
    return () => clear()
  }, [play, clear])

  return [play, clear]
}