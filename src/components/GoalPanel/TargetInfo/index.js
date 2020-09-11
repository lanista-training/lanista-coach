import * as React from "react";
import TargetInfo from './TargetInfo'
import { withApollo } from '../../lib/apollo'
import { useMutation } from '@apollo/react-hooks'
import { SAVEGOALTARGETVAUE } from "../../../mutations";
import { GETGOAL } from "../../../queries";
import moment from "moment";

const Panel = ({target, setScreen, goalId}) => {
  const [saveGoalTargetValue, { loading: mutationLoading, error: mutationError }] = useMutation(
    SAVEGOALTARGETVAUE,
    {
      update(cache,  { data: { saveGoalTargetValue } }) {
        let {getGoal} = cache.readQuery({
          query: GETGOAL,
          variables: {
            goalId: goalId,
          },
        });
        getGoal.targets.map((item, index) => {
          if(item.id == target.id) {
            let targetHistory = getGoal.targets[index].target_history
            targetHistory.push(saveGoalTargetValue)

            getGoal.targets[index].target_history = _.sortBy(targetHistory, 'change_date')
          }
        })
        cache.writeQuery({
          query: GETGOAL,
          variables: {
            goalId: goalId,
          },
          data: { getGoal: getGoal },
        });
      }
    }
  );
  const saveTargetEntry = (targetId, day, value) => {
    console.log("saveTargetEntry")
    saveGoalTargetValue({variables: {
      targetId: targetId,
      value: parseFloat(value),
      day: moment(day).format('YYYY-MM-DD hh:mm:ss'),
    }})
  }
  const {target_value, type, target_history, id} = target
  const initialValue = target_history && target_history.length > 0 ? target_history[0].value : null
  return(
    <TargetInfo
      targetId={id}
      initialValue={initialValue}
      targetValue={target_value}
      targetType={type}
      setScreen={setScreen}
      saveTargetEntry={(day, value) => console.log("MARK")}
    />
  )
}

export default withApollo(Panel)
