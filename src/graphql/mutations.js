// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createPlan = `mutation CreatePlan($input: CreatePlanInput!) {
  createPlan(input: $input) {
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
export const updatePlan = `mutation UpdatePlan($input: UpdatePlanInput!) {
  updatePlan(input: $input) {
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
export const deletePlan = `mutation DeletePlan($input: DeletePlanInput!) {
  deletePlan(input: $input) {
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
export const createPlanExercise = `mutation CreatePlanExercise($input: CreatePlanExerciseInput!) {
  createPlanExercise(input: $input) {
    id
    comment
    plan {
      id
      title
    }
  }
}
`;
export const updatePlanExercise = `mutation UpdatePlanExercise($input: UpdatePlanExerciseInput!) {
  updatePlanExercise(input: $input) {
    id
    comment
    plan {
      id
      title
    }
  }
}
`;
export const deletePlanExercise = `mutation DeletePlanExercise($input: DeletePlanExerciseInput!) {
  deletePlanExercise(input: $input) {
    id
    comment
    plan {
      id
      title
    }
  }
}
`;
