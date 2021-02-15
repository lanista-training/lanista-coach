import * as React from "react";
import {StyledDialog} from "./styles";
import { withApollo } from '../../lib/apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';

import { ACCEPTINVITATION } from "../../mutations";
import { useTranslate } from '../../hooks/Translation';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Panel = ({
  invitation,
  open,
  onClose,
  refetch,
 }) => {
   const [accepted, setAccepted] = React.useState(false);
   const [acceptInvitation, { loading, error }] = useMutation(
     ACCEPTINVITATION,
     {
       update(cache,  { data: { acceptInvitation } }) {
         refetch();
         setAccepted(true);
       }
     }
   );

   const {t} = useTranslate("dashboard");
   const {member} = invitation ? invitation : {member: {}};

  return (
    <StyledDialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="dialog-panel">
        <div className="user-section">
          <Avatar alt="Remy Sharp" src={member.photoUrl} />
          <div className="name-section first-name">{member.first_name}</div>
          <div className="name-section last-name">{member.last_name}</div>
        </div>
        <div className="info-section">
          {accepted ? t("invitation-accpeted") : t("invitation-info-text")}
        </div>
      </div>
      <div className="action-buttons">
        { !accepted && (
          <Fab
            variant="extended"
            size="small"
            className="negative"
            onClick={onClose}
            disabled={loading}
          >
            {t("back")}
          </Fab>
        )}
        <div className="button-wrapper">
          <Fab
            variant="extended"
            size="small"
            className="positive"
            onClick={ () => {
              accepted ? onClose() : acceptInvitation({
                variables: {
                  invitationId: invitation.id,
                }
              })
            }}
            disabled={loading}
          >
            {loading ? "" : accepted ? t('back') : t('accept invitation')}
          </Fab>
          {loading && <CircularProgress size={30} className="fab-progress" />}
        </div>
      </div>
    </StyledDialog>
  )
};

export default withApollo(Panel);
