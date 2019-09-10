import gql from "graphql-tag";

export const MEMBERS = gql`
  query Members($pageSize:Int, $after:String, $filter:String) {
    members(pageSize: $pageSize, after: $after, filter: $filter) {
      cursor
      hasMore
      total
      members {
        id
        first_name
        last_name
        email
      }
    }
  }
`
export const FEEDS = gql`
  query Feeds($pageSize:Int, $after:String, $filter:String) {
    feeds(pageSize: $pageSize, after: $after, filter: $filter) {
      cursor,
      hasMore,
      feeds{
        id
        type
        target_date
        member{
          id
          first_name
          last_name
          email
          photoUrl
        }
      }
    }
  }
`

export const INCOMINGEVENTS = gql`
  query IncomingEvents($filter:String) {
    incomingEvents(filter: $filter) {
      status,
      data{
        id
        type
        target_date
        member{
          id
          first_name
          last_name
          email
          photoUrl
        }
      }
    }
  }
`
export const MEMBERSCHEKEDIN = gql`
  query membersInStudio {
    membersInStudio {
      status
      data
    }
  }
`

export const MYMEMBERS = gql`
query myMembers {
  myMembers {
    status
    data
  }
}
`

export const EXPIREDPLANS = gql`
query expiredPlans {
  expiredPlans {
    status
    data
    total
  }
}
`

export const MESSAGES = gql`
query messages {
  messages {
    status
    data {
      text
      creation_date
      status
      member {
        id
        first_name
        last_name
        photoUrl
      }
    }
  }
}
`

export const CHAT = gql`
query chat($memberId:ID!) {
  chat(memberId: $memberId) {
    status
    data {
      text
      type
      photoUrl
      first_name
      last_name
      status
      creation_date
      exercise_name
      exercise_start_image
      exercise_end_image
    }
  }
}
`

export const CALENDARENTRIES = gql`
  query CalenderEntries($day:String) {
    calendarEntries(day: $day) {
      status,
      data{
        id
        type
        target_date
        start_date
        duration
        title
        member{
          id
          first_name
          last_name
          email
          photoUrl
        }
      }
    }
  }
`

export const EXERCISE = gql`
  query Exercise($exerciseId:ID!, $memberId:ID, $planexerciseId:ID) {
    exercise(exerciseId: $exerciseId, memberId: $memberId, planexerciseId: $planexerciseId) {
      id
      name
      start_image
      end_image
      coaching_notes
      mistakes
      muscle
      videoUrl
      member {
        id
        first_name
        last_name
      }
      notes {
        id
        text
        note_date
        creator {
          first_name
          last_name
          photoUrl
        }
      }
      workouts {
        id
        execution_date
        formated_date
        weight
        round
        repetitions
        training_unit
        self_protocolled
      }
      chats {
        id
        text
        type
        photoUrl
        first_name
        last_name
        status
        creation_date
        exercise_name
        exercise_start_image
        exercise_end_image
      }
      settings {
        id
        indications
        position
        weight
        rounds
        repetitions
        training_unit
      }
    }
  }
`
export const EXERCISES = gql`
  query Exercises($pageSize:Int, $after:String, $bodyFilters:[String] = [], $typeFilters:[String] = [], $toolFilters:[String] = [], $textFilter:String, $pluginFilters:[String] = []) {
    exercises(pageSize: $pageSize, after: $after, bodyFilters: $bodyFilters, typeFilters: $typeFilters, toolFilters: $toolFilters, textFilter: $textFilter, pluginFilters: $pluginFilters) {
      cursor
      hasMore
      total
      exercises {
        id
        name
        start_image
        end_image
      }
    }
  }
`

export const WORKOUTS = gql`
  query Workouts($filter:String) {
    workouts(filter: $filter) {
      id
      name
      description
      duration
      public
      plugin
      studio
    }
  }
`
export const WORKOUT = gql`
  query Workout($workoutId:ID!) {
    workout(workoutId: $workoutId) {
      id
      name
      description
      duration
      changed_date
      creator_full_name
      creator_image
      member {
        id
      }
      splits {
        id
        name
        exercises {
          id
          position
          weight
          rounds
          repetitions
          training_unit
          exercise {
            id
            name
            start_image
            end_image
          }
        }
      }
    }
  }
`

export const PLANEXERCISE = gql`
  query Planexercise($planexerciseId:ID!) {
    planexercise(planexerciseId: $planexerciseId) {
      id
      position
      weight
      rounds
      repetitions
      training_unit
      exercise {
        id
        name
        start_image
        end_image
      }
    }
  }
`

export const PLUGINS = gql`
  query Plugins {
    plugins {
      id
      name
      description
      imageUrl
    }
  }
`

export const ME = gql`
  query CurrentUserForLayout {
    me {
      id
      first_name
      last_name
      email
      bu
    }
  }
`

export const MEMBER = gql`
  query Member($memberId:ID!) {
    member(memberId: $memberId) {
      id
      first_name
      last_name
      email
      birthday
      gender
      plans {
        id
        name
        days
        duration
        changed_date
        description
        creator_id
        creator_full_name
        expiration_date
      }
      workouts {
        image_url
        execution_date
        formated_date
        weight
        round
        repetitions
        training_unit
        self_protocolled
        exercise_id
      }
      calipers {
        target_date
        weight
        height
        futrex
        trizeps
        scapula
        auxiliar
        chest
        sprailium
        abs
        quads
      }
      warnings {
        name
        description
        warning_type
        object_id
        creator_full_name,
        rating,
      }
    }
  }
`

export const MEMBER_MEASURES = gql`
  query Member($memberId:ID!) {
    member(memberId: $memberId) {
      id
      gender
      first_name
      last_name
      birthday
       measures {
        target_date
        arm_right
        arm_left
        waist
        umbilical
        chest
        spina_ilica_ant
        wide_hips
        quads_right
        quads_left
      }
      calipers {
        target_date
        weight
        height
        futrex
        trizeps
        scapula
        auxiliar
        chest
        sprailium
        abs
        quads
      }
      tests {
        id
        name
        description
        testnodes {
          id
          name
          scale
          type
        }
        testresults {
          id
          creation_date
          results
          comments
          creator_full_name
          score
          testtype
        }
      }
    }
  }
`

export const TESTS = gql`
  query Tests {
    tests {
      id
      name
      description
    }
  }
`

export const MEMBER_TEST_RESULT = gql`
  query Member($memberId:ID!, $testResultId:ID!) {
    member(memberId: $memberId, testResultId: $testResultId) {
      id
      gender
      first_name
      last_name
      tests {
        id
        name
        testnodes {
          id
          name
          scale
          type
        }
        testresults {
          id
          creation_date
          results
          comments
          creator_full_name
          score
          testtype
        }
      }
    }
  }
`

export const MEMBER_ANANMESE = gql`
  query Member($memberId:ID!) {
    member(memberId: $memberId) {
      id
      first_name
      last_name
      goals {
        id
        description
        warning_flag
        creation_date
        creator_user_id
        creator_full_name
        rating
        start_date
      }
      drugs {
        id
        description
        warning_flag
        creation_date
        creator_user_id
        creator_full_name
        start_date
      }
      physios {
        id
        description
        warning_flag
        creation_date
        creator_user_id
        creator_full_name
        rating
        start_date
      }
      sport_activities {
        id
        description
        warning_flag
        creation_date
        creator_user_id
        creator_full_name
        rating
        start_date
      }
      lifestyles {
        id
        description
        warning_flag
        creation_date
        creator_user_id
        creator_full_name
        rating
        start_date
      }
    }
  }
`

export const RECOMMENDATION = gql`
  query RecommendExercise($exerciseId:ID!) {
    recommendExercise(exerciseId: $exerciseId) {
      id
      name
      start_image
      end_image
    }
  }
`;

export const EXERCISESFILTER = gql`
  query ExercisesFilter {
    filter @client
  }
`;
