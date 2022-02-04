import axios from 'axios';

export function axiosGraphql(query: string, variables: object) {
  axios.post('http://localhost:4000/graphql', { query, variables: { ...variables } }).catch((err) => {
    console.log(err.data);
  });
}
