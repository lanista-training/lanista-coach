// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreatePlan = `subscription OnCreatePlan {
  onCreatePlan {
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
export const onUpdatePlan = `subscription OnUpdatePlan {
  onUpdatePlan {
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
export const onDeletePlan = `subscription OnDeletePlan {
  onDeletePlan {
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
export const onCreatePlanExercise = `subscription OnCreatePlanExercise {
  onCreatePlanExercise {
    id
    comment
    plan {
      id
      title
    }
  }
}
`;
export const onUpdatePlanExercise = `subscription OnUpdatePlanExercise {
  onUpdatePlanExercise {
    id
    comment
    plan {
      id
      title
    }
  }
}
`;
export const onDeletePlanExercise = `subscription OnDeletePlanExercise {
  onDeletePlanExercise {
    id
    comment
    plan {
      id
      title
    }
  }
}
`;
