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
  query Feeds($pageSize:Int, $after:String, $filter:String, $direction:String) {
    feeds(pageSize: $pageSize, after: $after, filter: $filter, direction:$direction) {
      cursor,
      hasMore,
      direction,
      feeds{
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

export const EXERCISE = gql`
  query Exercise($exerciseId:ID!, $memberId:ID) {
    exercise(exerciseId: $exerciseId, memberId: $memberId) {
      id
      name
      start_image
      end_image
      coaching_notes
      mistakes
      member {
        id
        first_name
        last_name
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
    }
  }
`
export const EXERCISES = gql`
  query Exercises($pageSize:Int, $after:String, $bodyFilters:[String] = [], $typeFilters:[String] = [], $toolFilters:[String] = [], $textFilter:String) {
    exercises(pageSize: $pageSize, after: $after, bodyFilters: $bodyFilters, typeFilters: $typeFilters, toolFilters: $toolFilters, textFilter: $textFilter) {
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
