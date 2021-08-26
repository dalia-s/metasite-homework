import { ContactDetails } from '../services/service'

export function abbreviateName(name: string) {
  return name.slice(0, 1).toUpperCase() + '.'
}

export function sortByFullName (a: ContactDetails, b: ContactDetails) {
  const left = a.name + a.surname
  const right = b.name + b.surname
  if (left < right) { return -1 }
  if (left > right) { return 1 }
  return 0
}

export function descendingSort(sortingFunc: (a: ContactDetails, b: ContactDetails) => {}) {
  return (a: ContactDetails, b: ContactDetails) => -sortingFunc(a, b)
}
