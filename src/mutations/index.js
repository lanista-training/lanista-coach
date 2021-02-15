import gql from "graphql-tag";

export const SENDPASSWORDRESET = gql`
  mutation Sendpasswordreset($email: String!) {
    sendpasswordreset(email: $email)
  }
`;

export const REGISTER = gql`
  mutation Register( $email: String!,  $password: String!, $language: String) {
     register(email: $email, password: $password, language: $language) {
         message
         user {
          id
        }
     }
  }
`;

export const CREATENOTE = gql`
  mutation CreateNote( $text: String!, $memberId: ID,  $exerciseId: ID, $planexerciseId: ID, $noteDate: String) {
     createNote(text: $text, memberId: $memberId, exerciseId: $exerciseId, planexerciseId: $planexerciseId, noteDate: $noteDate) {
         id
         note_date
         text
     }
  }
`;

export const UPDATENOTE = gql`
  mutation UpdateNote( $text: String!, $noteId: ID!) {
     updateNote(text: $text, noteId: $noteId) {
       id
     }
  }
`;

export const DELETENOTE = gql`
  mutation DeleteNote( $noteId: ID!) {
     deleteNote(noteId: $noteId) {
       id
     }
  }
`;

export const CREATECHATMESSAGE = gql`
  mutation CreateChatMessage( $text: String, $memberId: ID!,  $exerciseId: ID) {
     createChatMessage(text: $text, memberId: $memberId, exerciseId: $exerciseId) {
         id
         creation_date
         text
     }
  }
`;

export const DELETECHATMESSAGE = gql`
  mutation DeleteChatMessage( $messageId: ID! ) {
     deleteChatMessage( messageId: $messageId ) {
         id
     }
  }
`;

export const UPDATECHATMESSAGESTATUS = gql`
  mutation UpdateChatMessateStatus( $messageId: ID! ) {
     updateChatMessateStatus( messageId: $messageId ) {
         id
     }
  }
`;

export const SAVEEXERCISESETTINGS = gql`
  mutation SaveExerciseSettings( $planexerciseId: ID!, $indications: String, $sets: Int, $weight: Float, $training: Int, $unit: Int, $setsConfig: String) {
     saveExerciseSettings(planexerciseId: $planexerciseId, indications: $indications, sets: $sets, weight: $weight, training: $training, unit: $unit, setsConfig: $setsConfig) {
         indications
         rounds
         weight
         training
         unit
         sets {
           weight
           training
           unit
         }
     }
  }
`;

export const CHANGESPLITORDER = gql`
  mutation ChangeSplitOder( $planId: ID!, $split: Int, $newOrder: [Int]) {
     changeSplitOder(planId: $planId, split: $split, newOrder: $newOrder) {
       newOrder
       split
     }
  }
`;

export const DELETESPLIT = gql`
  mutation DeleteSplit( $planId: ID!, $split: Int!) {
     deleteSplit(planId: $planId, split: $split) {
       split
     }
  }
`;

export const SHIFTPLITRIGHT = gql`
  mutation ShiftSplitRight( $planId: ID!, $split: Int!) {
     shiftSplitRight(planId: $planId, split: $split) {
       split
     }
  }
`;

export const SHIFTPLITLEFT = gql`
  mutation ShiftSplitLeft( $planId: ID!, $split: Int!) {
     shiftSplitLeft(planId: $planId, split: $split) {
       split
     }
  }
`;

export const DUPLICATESPLIT = gql`
  mutation DuplicateSplit( $planId: ID!, $split: Int!) {
     duplicateSplit(planId: $planId, split: $split) {
       split
     }
  }
`;

export const CREATEPROTOCOLL = gql`
  mutation CreateProtocoll( $exerciseId: ID!, $memberId: ID!, $executionDate: String!, $training: Int!, $unit: Int!, $weight: Float!) {
     createProtocoll(exerciseId: $exerciseId, memberId: $memberId, executionDate: $executionDate, training: $training, unit: $unit, weight: $weight) {
       id
       execution_date
       weight
       repetitions
       training_unit
       exercise_id
     }
  }
`;

export const DELETEPROTOCOLL = gql`
  mutation DeleteProtocoll( $protocollId: ID!) {
     deleteProtocoll(protocollId: $protocollId) {
       id
     }
  }
`;

export const ADDEXERCISESTOPLAN = gql`
  mutation AddExercisesToPlan( $planId: ID!, $split: Int!, $exercises: String!, $settings: String! ) {
    addExercisesToPlan(planId: $planId, split: $split, exercises: $exercises, settings: $settings) {
      workoutId,
       split
       exercises {
         id
         position
         repetitions
         rounds
         training_unit
         weight
         exercise {
           id
           start_image
           end_image
           name
         }
       }
     }
   }
`;

export const UPLOADFILE = gql`
  mutation FileUpload( $file: Upload!, $memberId: ID! ) {
    fileUpload(file: $file, memberId: $memberId) {
      filename
      mimetype
      encoding
    }
  }
`;

export const UPDATEGOAL = gql`
  mutation UpdateGoal( $goalId: ID!, $target_date: String, $description: String, $warning_flag: Boolean, $rating: Int, $start_date: String ) {
    updateGoal(goalId: $goalId, target_date: $target_date, description: $description, warning_flag: $warning_flag, rating: $rating, start_date: $start_date) {
      id
      target_date
      description
      warning_flag
      rating
      start_date
    }
  }
`;

export const SAVEGOALTARGET = gql`
  mutation SaveGoalTarget( $goalId: ID!, $type: Int, $unit: Int, $targetValue: Float, $initialValue: Float ) {
    saveGoalTarget(goalId: $goalId, type: $type, unit: $unit, targetValue: $targetValue, initialValue: $initialValue) {
      id
      type
      unit
      target_value
      target_history {
        id
        value
      }
    }
  }
`;

export const SAVEGOALTARGETVAUE = gql`
  mutation saveGoalTargetValue( $targetId: ID!, $value: Float, $day: String ) {
    saveGoalTargetValue(targetId: $targetId, value: $value, day: $day) {
      id
      value
      change_date
    }
  }
`;

export const CCAUTHENTICATE = gql`
  mutation CcAuthenticate( $cctoken: String!) {
     cc(cctoken: $cctoken) {
       token
       name
       imageUrl
       users {
         first_name,
         last_name,
         photoUrl,
         id,
       }
       user {
         id
       }
     }
  }
`;

export const CCLOGIN = gql`
  mutation CcLogin( $cctoken: String!, $id: Int!) {
     cclogin(cctoken: $cctoken, id: $id) {
       token
       user {
        id
        email
        first_name
        last_name
        accesslevel
        photoUrl
      }
     }
  }
`;

export const CREATEPLAN = gql`
  mutation CreatePlan( $name: String!, $duration: Int,  $memberId: ID ) {
     createPlan(name: $name, memberId: $memberId, duration: $duration) {
       id
       name
       days
       duration
       creator_user_id
       description
       changed_date
       creation_date
       public
       creator_full_name
       creator_id
       creator_image
       expiration_date
     }
  }
`;

export const DELETEPLAN = gql`
  mutation DeletePlan( $planId: ID! ) {
     deletePlan(planId: $planId) {
       id
       template
     }
  }
`;

export const UPDATEPLAN = gql`
  mutation UpdatePlan( $planId: ID!, $name: String!, $description: String, $duration: Int ) {
     updatePlan(planId: $planId, name: $name, description: $description, duration: $duration) {
       id
       name
       description
       duration
     }
  }
`;

export const APPLYSETTINGSTOPLAN = gql`
  mutation ApplySettingsToPlan( $planId: ID!, $sets: Int!, $unit: Int!, $execution: Int! ) {
     applySettingsToPlan(planId: $planId, sets: $sets, unit: $unit, execution: $execution) {
       rounds
       training
       unit
     }
  }
`;

export const GENERATEPLANPDF = gql`
  mutation GeneratePlanPdf( $planId: ID!, $language: String, $printType: Int ) {
     generatePlanPdf(planId: $planId, language: $language, printType: $printType) {
       filename
       mimetype
       encoding
     }
  }
`;

export const SENDPLAN = gql`
  mutation SendPlan( $planId: ID!, $language: String, $printType: Int ) {
     sendPlan(planId: $planId, language: $language, printType: $printType) {
       status
       message
     }
  }
`;

export const CLONEPLAN = gql`
  mutation ClonePlan( $planId: ID!, $memberId: ID, $publicPlan: Boolean ) {
     clonePlan(planId: $planId, memberId: $memberId, publicPlan: $publicPlan) {
       id
       name
       description
       days
       duration
       changed_date
       creator_full_name
       creator_id
       creator_image
       expiration_date
       public
       splits{
         id
         name
         exercises {
           id
           indications
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
`;

export const CREATEFOLDER = gql`
  mutation createFolder( $folderName: String!, $folderType: Int ) {
     createFolder(folderName: $folderName, folderType: $folderType) {
       id
       name
       size
     }
  }
`;

export const DELETEFOLDER = gql`
  mutation deleteFolder( $folderId: ID! ) {
     deleteFolder(folderId: $folderId) {
       id
     }
  }
`;

export const CHANGEFOLDERNAME = gql`
  mutation ChangeFolderName( $folderId: ID!, $newName: String! ) {
     changeFolderName(folderId: $folderId, newName: $newName) {
       id
     }
  }
`;

export const ADDMEMBERTOFOLDER = gql`
  mutation AddMemberToFolder( $folderId: ID!, $memberId: ID! ) {
     addMemberToFolder(folderId: $folderId, memberId: $memberId) {
       id
     }
  }
`;

export const DELETEMEMBERFROMFOLDER = gql`
  mutation DeleteMemberFromFolder( $folderId: ID!, $memberId: ID! ) {
     deleteMemberFromFolder(folderId: $folderId, memberId: $memberId) {
       id
     }
  }
`;

export const ADDEXERCISETOFOLDER = gql`
  mutation AddExerciseToFolder( $folderId: ID!, $exerciseId: ID! ) {
     addExerciseToFolder(folderId: $folderId, exerciseId: $exerciseId) {
       id
     }
  }
`;

export const DELETEEXERCISEFROMFOLDER = gql`
  mutation DeleteExerciseFromFolder( $folderId: ID!, $exerciseId: ID! ) {
     deleteExerciseFromFolder(folderId: $folderId, exerciseId: $exerciseId) {
       id
     }
  }
`;

export const REQUESTDATAPRIVACYDOCUMENT = gql`
  mutation RequestDataPrivacyDocument( $memberId: ID! ) {
     requestDataPrivacyDocument(memberId: $memberId) {
       filename
       mimetype
       encoding
     }
  }
`;

export const DATAPRIVACYDOCUMENTSIGNED = gql`
  mutation DataPrivacyDocumentSigned( $memberId: ID! ) {
     dataPrivacyDocumentSigned(memberId: $memberId) {
       success
       error
     }
  }
`;

export const UPLOADSIGNATURE = gql`
  mutation UploadSignature( $memberId: ID!, $dataUrl: String! ) {
     uploadSignature(memberId: $memberId, dataUrl: $dataUrl) {
       success
       error
     }
  }
`;

export const UPDATEMEMBER = gql`
  mutation UpdateMember( $memberId: ID!, $email: String, $firstName: String, $lastName: String, $birthday: String, $gender: Int, $language: String, $phoneNumber: String, $note: String ) {
     updateMember(memberId: $memberId, email: $email, firstName: $firstName, lastName: $lastName, birthday: $birthday, gender:$gender, language: $language, phoneNumber: $phoneNumber, note: $note) {
       id
     }
  }
`;

export const UPDATEMEMBERADDRESS = gql`
  mutation UpdateMemberAddress( $memberId: ID!, $country: String, $city: String, $zipcode: String, $street: String, $phoneNumber: String ) {
     updateMemberAddress(memberId: $memberId, country: $country, city: $city, zipcode: $zipcode, street: $street, phoneNumber: $phoneNumber) {
       id
     }
  }
`;

export const SENDACTIVATIONMAIL = gql`
  mutation SendActivationMail( $memberId: ID! ) {
     sendActivationMail( memberId: $memberId ) {
       id
     }
  }
`;

export const UPLOADMEMBERIMAGE = gql`
  mutation UploadMemberImage( $file: Upload!, $memberId: ID! ) {
    uploadMemberImage(file: $file, memberId: $memberId) {
      filename
      mimetype
      encoding
    }
  }
`;

export const UPDATEEXERCISE = gql`
  mutation UpdateExercise( $exerciseId: ID!, $name: String, $execution: String, $mistakes: String, $language: String!) {
    updateExercise( exerciseId: $exerciseId, name: $name, execution: $execution, mistakes: $mistakes, language: $language ) {
      id
    }
  }
`;

export const UPDATEEXERCISEVIDEOLINK = gql`
  mutation UpdateExerciseVideoLink( $exerciseId: ID!, $videoLink: String! ) {
    updateExerciseVideoLink( exerciseId: $exerciseId, videoLink: $videoLink ) {
      id
    }
  }
`;

export const UPDATEEXERCISEINDEXES = gql`
  mutation UpdateExerciseIndexes ( $exerciseId: ID!, $muscle: ID!, $exerciseType: ID!, $addition: ID! ) {
    updateExerciseIndexes( exerciseId: $exerciseId, muscle: $muscle, exerciseType: $exerciseType, addition: $addition ) {
      id
    }
  }
`;

export const CREATEEXERCISE = gql`
  mutation CreateExercise ( $name: String! ) {
    createExercise( name: $name ) {
      id
    }
  }
`;

export const DELETEEXERCISE = gql`
  mutation DeleteExercise ( $exerciseId: ID! ) {
    deleteExercise( exerciseId: $exerciseId ) {
      id
    }
  }
`;

export const CREATEMEMBER = gql`
  mutation CreateMember ( $firstName: String, $lastName: String, $email: String ) {
    createMember( firstName: $firstName, lastName: $lastName, email: $email ) {
      success
      error
      errorMessage
      user {
        id
      }
    }
  }
`;

export const DELETEMEMBER = gql`
  mutation DeleteMember ( $memberId: ID! ) {
    deleteMember( memberId: $memberId ) {
      id
    }
  }
`;

export const SENDINVITATION = gql`
  mutation SendInvitation ( $to: String! ) {
    sendInvitation( to: $to ) {
      success
      error
      errorMessage
    }
  }
`;

export const ACCEPTINVITATION = gql`
  mutation AcceptInvitation ( $invitationId: ID! ) {
    acceptInvitation( invitationId: $invitationId ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVEVALUES = gql`
  mutation SaveValues ( $date: String!, $memberId: ID!, $data: [saveValuesInput]!, $note: String ) {
    saveValues( date: $date, memberId: $memberId, data: $data, note: $note ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVETEST = gql`
  mutation SaveTestResults ( $memberId: ID!, $testId: ID!, $testResult: String! ) {
    saveTestResults( memberId: $memberId, testId: $testId, testResult: $testResult ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVEOWNTEST = gql`
  mutation SaveOwnTestResults ( $memberId: ID!, $testId: ID!, $testResult: String! ) {
    saveOwnTestResults( memberId: $memberId, testId: $testId, testResult: $testResult ) {
      success
      error
      errorMessage
    }
  }
`;

export const GENERATETESTPDF = gql`
  mutation GenerateTestPdf( $testId: ID!, $language: String ) {
     generateTestPdf(testId: $testId, language: $language) {
       filename
       mimetype
       encoding
     }
  }
`;

export const SENDTEST = gql`
  mutation SendTest( $testId: ID!, $language: String ) {
     sendTest(testId: $testId, language: $language) {
       status
       message
     }
  }
`;

export const SAVECOMMENTS = gql`
  mutation SaveTestComments ( $memberId: ID!, $testId: ID!, $comments: String! ) {
    saveTestComments( memberId: $memberId, testId: $testId, comments: $comments ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVEOWNCOMMENTS = gql`
  mutation SaveOwnTestComments ( $memberId: ID!, $testId: ID!, $comments: String! ) {
    saveOwnTestComments( memberId: $memberId, testId: $testId, comments: $comments ) {
      success
      error
      errorMessage
    }
  }
`;

export const CREATETESTRECORD = gql`
  mutation CreateTestRecord ( $memberId: ID!, $testType: ID! ) {
    createTestRecord( memberId: $memberId, testType: $testType ) {
      success
      error
      errorMessage
      testType
      testRecordId
    }
  }
`;

export const DELETETESTRECORD = gql`
  mutation deleteTestRecord ( $testId: ID!, $memberId: ID! ) {
    deleteTestRecord( testId: $testId, memberId: $memberId ) {
      success
      error
      errorMessage
    }
  }
`;

export const DELETEOWNTESTRECORD = gql`
  mutation deleteOwnTestRecord ( $testId: ID!, $memberId: ID! ) {
    deleteOwnTestRecord( testId: $testId, memberId: $memberId ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVEFINDING = gql`
  mutation SaveFinding ( $findingId: ID!, $title: String, $description: String, $warningFlag: Boolean, $visible: Boolean, $rating: Int, $startDate: String, $endDate: String ) {
    saveFinding( findingId: $findingId, title: $title, description: $description, warningFlag: $warningFlag, visible: $visible, rating: $rating, startDate: $startDate, endDate: $endDate ) {
      success
      error
      errorMessage
    }
  }
`;

export const CREATEFINDING = gql`
  mutation CreateFinding ( $memberId: ID!, $xPosition: Int!, $yPosition: Int!, $title: String!, $description: String, $warningFlag: Boolean, $visible: Boolean, $rating: Int, $startDate: String, $endDate: String ) {
    createFinding( memberId: $memberId, xPosition: $xPosition, yPosition: $yPosition, title: $title, description: $description, warningFlag: $warningFlag, visible: $visible, rating: $rating, startDate: $startDate, endDate: $endDate ) {
      success
      error
      errorMessage
    }
  }
`;

export const DELETEFINDING = gql`
  mutation DeleteFinding ( $findingId: ID! ) {
    deleteFinding( findingId: $findingId ) {
      success
      error
      errorMessage
    }
  }
`;

export const CREATELIFESTYLE = gql`
  mutation CreateLifestyle ( $memberId: ID!, $description: String! ) {
    createLifestyle( memberId: $memberId, description: $description ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVELIFESTYLE = gql`
  mutation SaveLifestyle ( $itemId: ID!, $description: String!, $warningFlag: Boolean, $rating: Int, $startDate: String, $endDate: String ) {
    saveLifestyle( itemId: $itemId, description: $description, warningFlag: $warningFlag, rating: $rating, startDate: $startDate, endDate: $endDate ) {
      success
      error
      errorMessage
    }
  }
`;

export const DELETELIFESTYLE = gql`
  mutation DeleteLifestyle ( $itemId: ID! ) {
    deleteLifestyle( itemId: $itemId ) {
      success
      error
      errorMessage
    }
  }
`;

export const CREATEDRUG = gql`
  mutation CreateDrug ( $memberId: ID!, $description: String! ) {
    createDrug( memberId: $memberId, description: $description ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVEDRUG = gql`
  mutation SaveDrug ( $itemId: ID!, $description: String!, $warningFlag: Boolean, $rating: Int, $startDate: String, $endDate: String ) {
    saveDrug( itemId: $itemId, description: $description, warningFlag: $warningFlag, rating: $rating, startDate: $startDate, endDate: $endDate ) {
      success
      error
      errorMessage
    }
  }
`;

export const DELETEDRUG = gql`
  mutation DeleteDrug ( $itemId: ID! ) {
    deleteDrug( itemId: $itemId ) {
      success
      error
      errorMessage
    }
  }
`;

export const CREATESPORTACTIVITY = gql`
  mutation CreateSportActivity ( $memberId: ID!, $description: String! ) {
    createSportActivity( memberId: $memberId, description: $description ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVESPORTACTIVITY = gql`
  mutation SaveSportActivity ( $itemId: ID!, $description: String!, $warningFlag: Boolean, $rating: Int, $startDate: String, $endDate: String ) {
    saveSportActivity( itemId: $itemId, description: $description, warningFlag: $warningFlag, rating: $rating, startDate: $startDate, endDate: $endDate ) {
      success
      error
      errorMessage
    }
  }
`;

export const DELETESPORTACTIVITY = gql`
  mutation DeleteSportActivity ( $itemId: ID! ) {
    deleteSportActivity( itemId: $itemId ) {
      success
      error
      errorMessage
    }
  }
`;

export const CREATEGOAL = gql`
  mutation CreateGoal ( $memberId: ID!, $description: String! ) {
    createGoal( memberId: $memberId, description: $description ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVEGOAL = gql`
  mutation SaveGoal ( $itemId: ID!, $description: String!, $warningFlag: Boolean, $rating: Int, $startDate: String, $endDate: String ) {
    saveGoal( itemId: $itemId, description: $description, warningFlag: $warningFlag, rating: $rating, startDate: $startDate, endDate: $endDate ) {
      success
      error
      errorMessage
    }
  }
`;

export const DELETEGOAL = gql`
  mutation DeleteGoal ( $itemId: ID! ) {
    deleteGoal( itemId: $itemId ) {
      success
      error
      errorMessage
    }
  }
`;


export const CREATEPHYSIO = gql`
  mutation CreatePhysio ( $memberId: ID!, $description: String! ) {
    createPhysio( memberId: $memberId, description: $description ) {
      success
      error
      errorMessage
    }
  }
`;

export const SAVEPHYSIO = gql`
  mutation SavePhysio ( $itemId: ID!, $description: String!, $warningFlag: Boolean, $rating: Int, $startDate: String, $endDate: String ) {
    savePhysio( itemId: $itemId, description: $description, warningFlag: $warningFlag, rating: $rating, startDate: $startDate, endDate: $endDate ) {
      success
      error
      errorMessage
    }
  }
`;

export const DELETEPHYSIO = gql`
  mutation DeletePhysio ( $itemId: ID! ) {
    deletePhysio( itemId: $itemId ) {
      success
      error
      errorMessage
    }
  }
`;

export const GENERATEMEASURESPDF = gql`
  mutation GenerateMeasuresPdf( $memberId: ID! ) {
     generateMeasuresPdf( memberId: $memberId ) {
       filename
       mimetype
       encoding
     }
  }
`;

export const SENDMEASURESPDF = gql`
  mutation SendMeasuresPdf( $memberId: ID! ) {
     sendMeasuresPdf( memberId: $memberId ) {
       filename
       mimetype
       encoding
     }
  }
`;

export const DEFINETEST = gql`
  mutation DefineTest( $testName: String! ) {
     defineTest( testName: $testName ) {
       success
       error
       errorMessage
     }
  }
`;

export const CHANGETEST = gql`
  mutation ChangeTest( $testId: ID!, $name: String!, $description: String ) {
     changeTest( testId: $testId, name: $name, description: $description ) {
       success
       error
       errorMessage
     }
  }
`;

export const REMOVETEST = gql`
  mutation RemoveTest( $testId: ID! ) {
     removeTest( testId: $testId ) {
       success
       error
       errorMessage
     }
  }
`;

export const ADDEXERCISESTOTEST = gql`
  mutation AddExercisesToTest( $testId: ID!, $exercises: String! ) {
    addExercisesToTest(testId: $testId, exercises: $exercises) {
      testId,
       exercises {
         id
         position
         values
         exercise {
           id
           start_image
           end_image
           name
         }
       }
     }
   }
`;

export const REMOVEEXERCISEFROMTEST = gql`
  mutation RemoveExerciseFromTest( $testExerciseId: ID! ) {
    removeExerciseFromTest(testExerciseId: $testExerciseId) {
      success
      error
      errorMessage
    }
  }
`;

export const UPDATETESTEXERCISEVALUES = gql`
  mutation UpdateTestExerciseValues( $testExerciseId: ID!, $newValues: String! ) {
    updateTestExerciseValues(testExerciseId: $testExerciseId, newValues: $newValues) {
      success
      error
      errorMessage
    }
  }
`;

export const UPDATEUSERPERSONALDATA = gql`
  mutation UpdateUserPersonalData( $email: String, $firstName: String, $lastName: String, $language: String ) {
     updateUserPersonalData(email: $email, firstName: $firstName, lastName: $lastName, language: $language) {
       id
     }
  }
`;

export const UPDATEUSERADDRESS = gql`
  mutation UpdateUserAdress( $companyName: String, $phoneNumber: String, $website: String, $country: String, $city: String, $zipcode: String, $street: String ) {
     updateUserAddress( companyName: $companyName, phoneNumber: $phoneNumber, website: $website, country: $country, city: $city, zipcode: $zipcode, street: $street ) {
       id
     }
  }
`;

export const UPDATEUSERBANNERURL = gql`
  mutation UpdateUserBannerLink( $url: String! ) {
     updateUserBannerLink( url: $url ) {
       id
     }
  }
`;

export const UPDATEUSERWORKOUTCHANNELDATA = gql`
  mutation UpdateUserWorkoutChannelData( $workoutEnable: Boolean, $facebook: String, $googleplus: String, $twitter: String, $promoVideo: String, $promoText: String ) {
     updateUserWorkoutChannelData( workoutEnable: $workoutEnable, facebook: $facebook, googleplus: $googleplus, twitter: $twitter, promoVideo: $promoVideo, promoText: $promoText ) {
       id
     }
  }
`;

export const VERIFYPASSWORD = gql`
  mutation VerifyPassword($password:String!) {
    verifyPassword(password: $password) {
      success
      error
    }
  }
`;

export const CHANGEPASSWORD = gql`
  mutation ChangePassword($oldPassword:String!, $newPassword:String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      success
      error
    }
  }
`;

export const CREATEPLANFROMWORKOUT = gql`
  mutation CreatePlanFromWorkout($planId: ID, $memberId: ID!, $workoutDay: String!) {
    createPlanFromWorkout(planId: $planId, memberId: $memberId, workoutDay: $workoutDay) {
      id
    }
  }
`;

export const GETNEWTOKEN = gql`
  mutation GetNewTocken {
    getNewTocken {
      token
    }
  }
`;

export const GETTARIFF = gql`
  mutation GetTariff($tariff: Int!) {
    getTariff(tariff: $tariff) {
      amount
      uniqid
      hash
      authCode
      product
      tariff
      testMode
      tariffPeriod
    }
  }
`;

export const SAVEANAMNESENOTE = gql`
  mutation SaveAnamneseNote( $anamneseId: ID!, $text: String!, $noteDate: String! ) {
    saveAnamneseNote( anamneseId: $anamneseId,  text: $text, noteDate: $noteDate) {
      success
      error
    }
  }
`;

export const DELETEANAMNESENOTE = gql`
  mutation DeleteAnamneseNote( $noteId: ID! ) {
    deleteAnamneseNote( noteId: $noteId ) {
      success
      error
    }
  }
`;
