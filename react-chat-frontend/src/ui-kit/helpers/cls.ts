type Cls = (...a: Array<undefined | null | string | boolean>) => string

export const cls: Cls = (...args) =>
  args
    .flat()
    .filter((x) => x !== null && x !== undefined && typeof x !== 'boolean')
    .join(' ')
