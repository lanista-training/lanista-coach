import gql from "graphql-tag";

export const SENDPASSWORDRESET = gql`
  mutation Sendpasswordreset($email: String!) {
    sendpasswordreset(email: $email)
  }
`;

export const REGISTER = gql`
  mutation Register( $email: String!,  $password: String!) {
     register(email: $email, password: $password) {
         message
         user {
          id
        }
     }
  }
`;

export const CREATENOTE = gql`
  mutation CreateNote( $text: String!, $memberId: ID,  $exerciseId: ID) {
     createNote(text: $text, memberId: $memberId, exerciseId: $exerciseId) {
         id
         note_date
         text
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

export const SAVEEXERCISESETTINGS = gql`
  mutation SaveExerciseSettings( $planexerciseId: ID!, $indications: String, $sets: Int, $weight: Float, $training: Int, $unit: Int) {
     saveExerciseSettings(planexerciseId: $planexerciseId, indications: $indications, sets: $sets, weight: $weight, training: $training, unit: $unit) {
         indications
         rounds
         weight
         repetitions
         training_unit
     }
  }
`;
