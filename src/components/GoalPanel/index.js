import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../lib/apollo'
import GoalPanel from './GoalPanel';
import { GETGOAL } from "../../queries";
import { UPDATEGOAL, SAVEGOALTARGET, CREATEGOAL } from "../../mutations";

const PanelWithData = ({goal, onSyncGoal, onDeleteGoal}) => {

  const [saveTarget, { loading: targetMutationLoading, error: targetMutationError }] = useMutation(
    SAVEGOALTARGET,
    {
      update(cache,  { data: { saveGoalTarget } }) {
        let {getGoal} = cache.readQuery({
          query: GETGOAL,
          variables: {
            goalId: goal.id,
          },
        });
        let targets = []
        targets.push(saveGoalTarget)
        getGoal.targets = targets
        cache.writeQuery({
          query: GETGOAL,
          variables: {
            goalId: goal.id,
          },
          data: { getGoal: getGoal },
        });
      }
    }
  );
  //const weight = member && member.calipers && member.calipers[0].weight
  return(
    <GoalPanel
      goal={goal}
      onSyncGoal={onSyncGoal}
      saveTarget={saveTarget}
      onDeleteGoal={onDeleteGoal}
    />
  )
}



export default withApollo(PanelWithData)
