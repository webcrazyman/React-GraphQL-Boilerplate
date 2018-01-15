import nFetch from 'whatwg-fetch'

// Remove fetch as a global dep
// so we can use whatwg-fetch on
// non-window env
export const gqlAbstract = fetch => url => ({
  operationName = '',
  query = '',
  variables = {}
}) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      operationName,
      query,
      variables
    })
  }).then(res => {
    if (res.ok) {
      return res.json()
    }

    const err = new Error('You have done something wrong!')

    err.code = 422

    throw err
  })

export const gql = gqlAbstract(typeof fetch === 'undefined' ? nFetch : fetch)
