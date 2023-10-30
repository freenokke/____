export function removeScrollShifting() {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.classList.add('body_lock')
  document.body.style.marginLeft = `-${scrollBarWidth}px`
}

export function comeBackScrollShifting() {
  document.body.classList.remove('body_lock')
  document.body.style.marginLeft = null
}