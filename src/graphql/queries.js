// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    firstName
    lastName
    email
    plans {
      items {
        id
        title
      }
      nextToken
    }
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      firstName
      lastName
      email
      plans {
        items {
          id
          title
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPlan = `query GetPlan($id: ID!) {
  getPlan(id: $id) {
    id
    title
    user {
      id
      firstName
      lastName
      email
    }
    planExercises {
      items {
        id
        comment
      }
      nextToken
    }
  }
}
`;
export const listPlans = `query ListPlans(
  $filter: ModelPlanFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      user {
        id
        firstName
        lastName
        email
      }
      planExercises {
        items {
          id
          comment
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPlanExercise = `query GetPlanExercise($id: ID!) {
  getPlanExercise(id: $id) {
    id
    comment
    plan {
      id
      title
    }
  }
}
`;
export const listPlanExercises = `query ListPlanExercises(
  $filter: ModelPlanExerciseFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlanExercises(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      comment
      plan {
        id
        title
      }
    }
    nextToken
  }
}
`;
