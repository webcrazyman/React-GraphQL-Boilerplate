export const gql = url => ({
  operationName = '',
  query = '',
  variables = {}
}) => fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      operationName,
      query,
      variables
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      const err = new Error('You have done something wrong!')

      err.code = 422

      throw err
    })