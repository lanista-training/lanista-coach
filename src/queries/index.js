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
