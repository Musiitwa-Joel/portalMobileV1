import { gql } from "@apollo/client";


const LOGIN = gql`
mutation studentPortalLogin($userId: String!, $password: String!) {
  studentPortalLogin(user_id: $userId, password: $password) {
    token
  }
}
`


export {
    LOGIN
}