import React, { useEffect, useState, useRef } from 'react';
import moment from "moment";
import { Pane } from './styles';
import Finding from './Finding';

const COLORS = [];
COLORS['TRAINER'] = '#34acfb';
COLORS['PHYSIO'] = '#fe9500';
COLORS['DOCTOR'] = '#59d76e';


export default ({
  me,
  customer,

  id,

  t,
  findings,

  onSaveFinding,
  saveFindingLoading,
  saveFindingError,

  onCreateFinding,
  createFindingLoading,
  createFindingError,

  onDeleteFinding,
  deleteFindingLoading,
  deleteFindingError,

  onSaveAnamneseNote,
  saveAnamneseNoteLoading,
  saveAnamneseNoteError,

  onDeleteAnamneseNote,
  deleteAnamneseNoteLoading,
  deleteAnamneseNoteError,

  onToggleAnamneseStatus,
  toggleAnamneseStatusLoading,
  toggleAnamneseStatusError,

  onTogleFindingFeedbackRequest,
  toogleFindingFeedbackRequestLoading,
  toogleFindingFeedbackRequestError,

}) => {

  const [openFirst, setOpenFirst] = useState(id);

  const [imageRadio, setImageRadio] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  const [open, setOpen] = useState(null);

  const ref = useRef();

  useEffect(() => {

    if( ref.current ) {
      let newImageRadio = ref.current.offsetHeight/630;
      setImageRadio(newImageRadio);
      setMarginLeft((ref.current.offsetWidth - (750*newImageRadio))/2);
    }
  }, []);

  const onImagePanelClick = (e) => {
    if(e.target.id == "body-image") {
      let rect = e.target.getBoundingClientRect();
      const xPosition = e.clientX - rect.x;
      const yPosition = e.clientY - rect.y;
      const tmp = [...findings];
      tmp.push({
        position: {
          x: (xPosition - marginLeft)/imageRadio - (10),
          y: yPosition/imageRadio + (10),
        },
        creator: {
          first_name: me.first_name,
          id: me.id,
          last_name: me.last_name,
          photoUrl: me.photoUrl,
          role: me.role,
        },
        creation_date: (new Date()).getTime(),
        description: "",
        last_change: (new Date()).getTime(),
        rating: null,
        title: "",
        visible: false,
        warning_flag: false,
        start_date: 0,
        end_date: 0,
      })
      setFindingsOnScreen(tmp);
    }
  }

  const [findingsOnScreen, setFindingsOnScreen] = useState([]);

  useEffect(() => {
    if(findings && findings.length > 0 ) {
      setFindingsOnScreen(findings.slice(0));
    }
  }, [findings]);

  useEffect(() => {
    if(openFirst && findingsOnScreen && findingsOnScreen.length > 0 ) {
      const findingIndex = findingsOnScreen.findIndex(f => f.id == openFirst);
      setOpenFirst(undefined);
    }
  }, [findingsOnScreen]);

  const cleanupPanel = () => {
    setFindingsOnScreen(findings.slice(0));
  }

  return <Pane>
    <div className="image-wrapper">
      <div id="body-image" className="body-image" ref={ ref } onClick={onImagePanelClick}>
        {findingsOnScreen.map((finding, index) => {
          const {x, y} = finding.position;
          return <Finding
            t={t}
            customer={customer}
            finding={finding}
            top={y*imageRadio}
            left={(x*imageRadio) + marginLeft}
            color={COLORS[finding.creator.role]}
            setOpen={() => setOpen(index == open ? null : index)}
            open={index == open}

            onSaveFinding={onSaveFinding}
            saveFindingLoading={saveFindingLoading || createFindingLoading || deleteFindingLoading}
            saveFindingError={saveFindingError || createFindingError || deleteFindingError}

            onCreateFinding={onCreateFinding}

            onDeleteFinding={onDeleteFinding}

            cleanupPanel={cleanupPanel}

            onSaveAnamneseNote={onSaveAnamneseNote}
            saveAnamneseNoteLoading={saveAnamneseNoteLoading}
            saveAnamneseNoteError={saveAnamneseNoteError}

            onDeleteAnamneseNote={onDeleteAnamneseNote}
            deleteAnamneseNoteLoading={deleteAnamneseNoteLoading}
            deleteAnamneseNoteError={deleteAnamneseNoteError}

            onToggleAnamneseStatus={onToggleAnamneseStatus}
            toggleAnamneseStatusLoading={toggleAnamneseStatusLoading}
            toggleAnamneseStatusError={toggleAnamneseStatusError}

            onTogleFindingFeedbackRequest={onTogleFindingFeedbackRequest}
            toogleFindingFeedbackRequestLoading={toogleFindingFeedbackRequestLoading}
            toogleFindingFeedbackRequestError={toogleFindingFeedbackRequestError}

            isPhysio={me && me.bu_type == 2}
          />
        })}
      </div>
    </div>
  </Pane>
}
