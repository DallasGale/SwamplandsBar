import scrollToElement from 'scroll-to-element'

export const handleScrollTo = (id: string, scrollOffset: number): any => {
  if (typeof document !== 'undefined') {
    const ele = document.getElementById(id)

    return scrollToElement(ele, {
      ease: 'inOutExpo',
      duration: 1200,
      offset: scrollOffset,
    })
  }
}

