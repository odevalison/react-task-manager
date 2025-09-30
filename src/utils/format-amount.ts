export const formatAmount = (amount: number) => {
  if (amount < 1000) {
    return `${amount}ml`
  } else if (amount === 1000) {
    return `${amount / 1000} litro`
  } else {
    return `${amount / 1000} litros`
  }
}
