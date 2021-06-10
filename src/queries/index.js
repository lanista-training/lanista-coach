import gql from "graphql-tag";

export const MEMBERS = gql`
  query Members($pageSize:Int, $after:String, $filter:String, $last:Boolean, $folderId:ID, $substractFolderMembers: Boolean) {
    members(pageSize: $pageSize, after: $after, filter: $filter, last: $last, folderId: $folderId, substractFolderMembers: $substractFolderMembers) {
      cursor
      hasMore
      total
      members {
        id
        first_name
        last_name
        email
        photoUrl
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

export const MYMEMBERSLIST = gql`
query myMembersList {
  myMembersList {
    id
    first_name
    last_name
    photoUrl
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

export const PERSONALTRAINERSTATISTIC1 = gql`
query PersonalTrainerStatistic1 {
  personalTrainerStatistic1 {
    status
    data
    total
  }
}
`

export const PERSONALTRAINERSTATISTIC2 = gql`
query PersonalTrainerStatistic2 {
  personalTrainerStatistic2 {
    status
    data
    total
  }
}
`

export const MEMBERSACTIVITY = gql`
query membersActivity {
  membersActivity {
    status
    data
    total
  }
}
`

export const PLANSCREATED = gql`
query plansCreated {
  plansCreated {
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
      id
      type
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
      exercise_id
      exercise_start_image
      exercise_end_image
      creator_user_id
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
  query Exercise($exerciseId:ID!, $memberId:ID, $planexerciseId:ID, $language: String) {
    exercise(exerciseId: $exerciseId, memberId: $memberId, planexerciseId: $planexerciseId, language: $language) {
      id
      name
      start_image
      end_image
      start_image_full_size
      end_image_full_size
      coaching_notes
      mistakes
      muscle
      videoUrl
      editable
      owner
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
        creator_user_id
      }
      settings {
        id
        indications
        position
        weight
        rounds
        training
        unit
        sets {
          weight
          training
          unit
        }
      }
      creator {
        id
        first_name
        last_name
        photoUrl
      }
      changer {
        id
        first_name
        last_name
        photoUrl
      }
      creation_date
      last_change
    }
  }
`

export const EXERCISE_EDIT = gql`
  query ExerciseEdit($exerciseId:ID!) {
    exercise(exerciseId: $exerciseId) {
      id
      name_DE
      name_EN
      name_ES
      name_FR
      name_PT
      name_RU
      coaching_notes_DE
      coaching_notes_EN
      coaching_notes_ES
      coaching_notes_FR
      coaching_notes_PT
      coaching_notes_RU
      mistakes_DE
      mistakes_EN
      mistakes_ES
      mistakes_FR
      mistakes_PT
      mistakes_RU
      muscle
      videoUrl
      editable
      owner
      muscle
      exercise_type
      addition
    }
  }
`

export const EXERCISES = gql`
  query Exercises($pageSize:Int, $after:String, $bodyFilters:[String] = [], $typeFilters:[String] = [], $toolFilters:[String] = [], $textFilter:String, $pluginFilters:[String] = [], $folderId: ID, $substractFolderExercises: Boolean, $private: Boolean, $recentlyUsed: Boolean, $language: String) {
    exercises(pageSize: $pageSize, after: $after, bodyFilters: $bodyFilters, typeFilters: $typeFilters, toolFilters: $toolFilters, textFilter: $textFilter, pluginFilters: $pluginFilters, folderId: $folderId, substractFolderExercises: $substractFolderExercises, private: $private, recentlyUsed: $recentlyUsed, language: $language) {
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
  query Workouts($filter:String, $language: String, $public:Boolean) {
    workouts(filter: $filter, language: $language, public: $public) {
      id
      name
      description
      duration
      public
      plugin
      studio
      lanista
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
      creator_id
      creator_image
      template
      public
      member {
        id
        first_name
        last_name
        photoUrl
        status
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
          hasIndications
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
  query Me {
    me {
      id
      email
      first_name
      last_name
      photoUrl
      role
      bu
      hasInterface
      accesslevel
      language
      dataPrivacyPolicy
      bu_type
    }
  }
`

export const ME_SETTINGS = gql`
  query Me {
    me {
      id
      email
      first_name
      last_name
      photoUrl
      photoUrlFullSize
      role
      bu
      accesslevel
      language
      dataPrivacyPolicy
      expiration_date
      company_name
      phone_nr
      website
      country
      zipcode
      street
      city
      banner_link
      banner_photoUrl
      workout_enable
      facebook
      googleplus
      twitter
      promo_video
      promo_text
      workout_imageUrl
      logo_imageUrl
      ll
      workout_channelUrl
    }
  }
`

export const MEMBER = gql`
  query Member($memberId:ID!) {
    member(memberId: $memberId) {
      id
      status
      first_name
      last_name
      email
      birthday
      gender
      phone_nr
      note
      country
      zipcode
      street
      city
      language
      dpSigned
      dpSignaturePolicy
      dpSignatureType
      dpLocation
      photoUrl
      photoUrlFullSize
      workouts {
        id
        image_url
        start_image_url
        end_image_url
        execution_date
        formated_date
        weight
        round
        repetitions
        training_unit
        self_protocolled
        exercise_id
      }
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
        warning_type
        object_id
        rating,
      }
      goals {
        id
        description
        warning_flag
        creation_date
        target_date
        rating {
          id
          date
          value
          creation_date
        }
        start_date
        target_date
        creator {
          first_name
          last_name
          photoUrl
        }
      }
      notes {
        id
        text
        note_date
        exercise {
          id
          name
          start_image
          end_image
        }
        creator {
          id
          photoUrl
          first_name
          last_name
        }
      }
    }
  }
`

export const MEMBER_MEASURES = gql`
  query Member($memberId:ID!) {
    member(memberId: $memberId) {
      id
      photoUrl
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
        note
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
        fatmass
        musclemass
        visceralfat
        fatfreemass
        bodywater
        note
      }
      tests {
        id
        name
        description
        withScore
        testnodes {
          id
          name
          scale
          type
          values
          exercise {
            name
            start_image
            end_image
          }
          imageUrl
        }
        testresults {
          id
          creation_date
          results
          comments
          creator_full_name
          score
          testtype
          editable
        }
      }
    }
  }
`

export const MEMBER_ANAMNESE = gql`
  query Member($memberId:ID!) {
    member(memberId: $memberId) {
      id
      photoUrl
      gender
      first_name
      last_name
      birthday
      lifestyles {
        id
        description
        rating {
          id
          date
          value
          creator {
            id
            first_name
            last_name
            photoUrl
            role
          }
          creation_date
        }
        warning_flag
        creation_date
        start_date
        end_date
        creator {
          id
          first_name
          last_name
          photoUrl
        }
      }
      drugs {
        id
        description
        warning_flag
        creation_date
        start_date
        end_date
        rating {
          id
          date
          value
          creator {
            id
            first_name
            last_name
            photoUrl
            role
          }
          creation_date
        }
        creator {
          id
          first_name
          last_name
          photoUrl
        }
      }
      sport_activities {
        id
        description
        rating {
          id
          date
          value
          creator {
            id
            first_name
            last_name
            photoUrl
            role
          }
          creation_date
        }
        warning_flag
        creation_date
        start_date
        end_date
        creator {
          id
          first_name
          last_name
          photoUrl
        }
      }
      goals {
        id
        description
        rating {
          id
          date
          value
          creator {
            id
            first_name
            last_name
            photoUrl
            role
          }
          creation_date
        }
        warning_flag
        creation_date
        start_date
        end_date
        creator {
          id
          first_name
          last_name
          photoUrl
        }
      }
      physios {
        id
        description
        findingName
        rating {
          id
          date
          value
          creator {
            id
            first_name
            last_name
            photoUrl
            role
          }
          creation_date
        }
        warning_flag
        creation_date
        start_date
        end_date
        creator {
          id
          first_name
          last_name
          photoUrl
        }
      }
      findings {
        id
        title
        description
        request_feedback
        position {
          x
          y
        }
        warning_flag
        last_change
        creation_date
        start_date
        end_date
        creator {
          id
          first_name
          last_name
          photoUrl
          role
        }
        rating {
          id
          date
          value
          creator {
            id
            first_name
            last_name
            photoUrl
            role
          }
          creation_date
        }
        visible
        notes {
          id
          text
          note_date
          creator {
            id
            first_name
            last_name
            photoUrl
          }
        }
        status
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
      imageUrl
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


export const GETGOAL = gql`
  query GetGoal($goalId:ID!) {
    getGoal(goalId: $goalId) {
      id
      description
      warning_flag
      creation_date
      rating
      start_date
      target_date
      creator {
        first_name
        last_name
        photoUrl
      }
      targets {
        id
        type
        unit
        target_value
        target_history {
          id
          value
          change_date
        }
      }
    }
  }
`;

export const GETMEMBERFILES = gql`
  query getMemberFiles($memberId:ID!) {
    getMemberFiles(memberId: $memberId) {
      filename
      mimetype
      encoding
      last_change
    }
  }
`;

export const EXERCISEFOLDERS = gql`
  query ExerciseFolders {
    exerciseFolders {
      id
      name
      size
    }
  }
`;

export const MEMBERFOLDERS = gql`
  query MemberFolders {
    memberFolders {
      id
      name
      size
    }
  }
`;

export const OWNTESTS = gql`
  query OwnTests {
    ownTests {
      id
      name
      description
      previewImages
    }
  }
`;

export const OWNTEST = gql`
  query OwnTest($testId:ID!) {
    ownTest(testId: $testId) {
      id
      name
      description
      testExercises {
        id
        values
        exercise {
          id
          name
          start_image
          end_image
        }
      }
    }
  }
`;

export const PROTOCOLLS = gql`
  query Protocolls($memberId:ID!, $pageSize:Int, $after:Int) {
    protocolls(memberId: $memberId, pageSize: $pageSize, after: $after) {
      id
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
  }
`;

export const GETTRAINERSLIST = gql`
  query GetTrainersList($tbt:String!) {
    getTrainersList(tbt: $tbt) {
      email
      role
      photoUrl
      first_name
      last_name
    }
  }
`;

export const GETDOMAININFO = gql`
  query GetDomainInfo {
    getDomainInfo {
      logoUrl
    }
  }
`;
