import RecommendationPanel from './RecommendationPanel';
import { Query } from "react-apollo"
import { RECOMMENDATION } from "../../queries";
import { withApollo } from '../../../lib/apollo'
import { useQuery } from '@apollo/react-hooks'

const Panel = function({exerciseId, closePanel, visible}) {

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    RECOMMENDATION,
    {
      variables: {
        exerciseId: exerciseId
      },
      notifyOnNetworkStatusChange: true
    }
  )

  return (<RecommendationPanel
    data={data && data.recommendExercise ? data.recommendExercise : []}
    loading={loading}
    error={error}
  />)

}

export default withApollo(Panel)
