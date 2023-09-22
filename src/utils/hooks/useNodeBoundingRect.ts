import React, {
  useState,
  useEffect,
  RefObject,
} from 'react'
interface Size {
  width: number
  height: number
}

export default function useNodeBoundingRect<T extends HTMLElement = HTMLDivElement>(
  elementRef: RefObject<T>
) {
  const [rect, setRect] = useState<DOMRectReadOnly | Size>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (!window.ResizeObserver) {
      return
    }
    const resizeObserver = new window.ResizeObserver((entries) => {
      setRect(entries[0].contentRect)
    })

    if (elementRef.current !== null) {
      resizeObserver.observe(elementRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!elementRef.current) {
      return
    }
    
    if (elementRef.current.getBoundingClientRect) {
      setRect(elementRef.current.getBoundingClientRect())
    } else {
      setRect({
        width: elementRef.current.clientWidth,
        height: elementRef.current.clientHeight
      })
    }
  }, [elementRef.current])

  return rect
}
