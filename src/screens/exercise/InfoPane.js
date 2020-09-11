import React, { useEffect, useRef, useState } from 'react';
import cookie from 'js-cookie';

import { withApollo } from '../../lib/apollo';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { EXERCISE_EDIT } from '../../queries';
import { UPDATEEXERCISE, UPDATEEXERCISEVIDEOLINK, UPDATEEXERCISEINDEXES } from '../../mutations';
import ImageEditor from '../../components/ImageEditor';

import { Tab } from 'semantic-ui-react';
import BodyFilter from "../../components/BodyFilter";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
//
//  EDIT EXERCISE CONTENT
//
const EditSection = withApollo(({t, exerciseId, toggleEditMode, editNameMode, lang}) => {

  const { loading, error, data:{exercise}, refetch } = useQuery(EXERCISE_EDIT, {
    variables: {
      exerciseId: exerciseId,
    },
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  });

  const [updateExercise, { loading: updateExerciseLoading, error: updateExerciseError }] = useMutation(
    UPDATEEXERCISE,
    {
      update(cache,  { data: { updateExercise } }) {
        updateExercise.id !== 0 && refetch();
      }
    }
  );

  const [execution, setExecution] = useState('');
  const [mistakes, setMistakes] = useState('');
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('EN');
  const [change, setChange] = useState(false);

  useEffect(() => {
    if(exercise) {
      const originalExecution = exercise['coaching_notes_' + lang].map(note => note.split('||').join('\n')).join('\n');
      const originalMismakes = exercise['mistakes_' + lang].map(note => note.split('||').join('\n')).join('\n');
      const originalName = exercise['name_' + lang];
      setExecution(originalExecution);
      setMistakes(originalMismakes);
      setName(originalName);
      setLanguage(lang);
    }
    setChange(false);
  }, [exercise]);

  useEffect(() => {
    if(exercise) {
      const originalExecution = exercise['coaching_notes_' + language].map(note => note.split('||').join('\n')).join('\n');
      const originalMismakes = exercise['mistakes_' + language].map(note => note.split('||').join('\n')).join('\n');
      const originalName = exercise['name_' + language];
      if( execution !== originalExecution || mistakes !== originalMismakes || name !== originalName) {
        console.log("CN Have changed");
        setChange(true);
      } else {
        setChange(false);
      }
    }
  }, [execution, mistakes, name]);

  useEffect(() => {
    if(language && exercise) {
      setExecution(exercise['coaching_notes_' + language].map(note => note.split('||').join('\n')).join('\n'));
      setMistakes(exercise['mistakes_' + language].map(note => note.split('||').join('\n')).join('\n'));
      setName(exercise['name_' + language]);
    }
  }, [language]);

  const onExecutionChange = (e) => {
    setExecution(e.target.value);
  }

  const onMistakesChange = (e) => {
    setMistakes(e.target.value);
  }

  const onNameChange = (e) => {
    setName(e.target.value);
  }

  const onUpdateExercise = () => {
    updateExercise({
      variables: {
        exerciseId: exerciseId,
        name: name,
        execution: execution.split('\n').join('||'),
        mistakes: mistakes.split('\n').join('||'),
        language: language,
      }
    })
  }

  return (
    editNameMode ?
    <>
      <div className="info-text editing">
        <div className="info-title">
          <div className="text-section">{t('EXERCISE_NAME')}</div>
          <Select
            id="language-list"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className='language-selector'
          >
            <MenuItem value={'DE'}>Deutsch</MenuItem>
            <MenuItem value={'ES'}>Español</MenuItem>
            <MenuItem value={'EN'}>English</MenuItem>
            <MenuItem value={'FR'}>Française</MenuItem>
            <MenuItem value={'PT'}>Portuguese</MenuItem>
            <MenuItem value={'RU'}>русскоязычный</MenuItem>
          </Select>
        </div>
        <TextField
          id="exercise-name"
          rows={3}
          variant="outlined"
          value={name}
          onChange={onNameChange}
        />
      </div>
      <div className="buttons-section">
        <Button variant="outlined" onClick={toggleEditMode}>{t("CANCEL")}</Button>
        <Button variant="outlined" onClick={onUpdateExercise} className={change ? 'active' : ''}>{t("SAVE")}</Button>
      </div>
    </>
  :
    <>
      <div className="info-text editing">
        <div className="info-title">
          <div className="text-section">{t('EXECUTION')}</div>
          <Select
            id="language-list"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className='language-selector'
          >
            <MenuItem value={'DE'}>Deutsch</MenuItem>
            <MenuItem value={'ES'}>Español</MenuItem>
            <MenuItem value={'EN'}>English</MenuItem>
            <MenuItem value={'FR'}>Française</MenuItem>
            <MenuItem value={'PT'}>Portuguese</MenuItem>
            <MenuItem value={'RU'}>русскоязычный</MenuItem>
          </Select>
        </div>
        <TextField
          id="exercise-execution"
          multiline
          rows={3}
          variant="outlined"
          value={execution}
          onChange={onExecutionChange}
        />
      </div>
      <div className="info-text editing">
        <div className="info-title">
          {t("MISTAKES")}
        </div>
        <TextField
          id="exercise-mistakes"
          multiline
          rows={3}
          defaultValue={t("EXECUTION")}
          variant="outlined"
          value={mistakes}
          onChange={onMistakesChange}
        />
      </div>
      <div className="buttons-section">
        <Button variant="outlined" onClick={toggleEditMode}>{t("CANCEL")}</Button>
        <Button variant="outlined" onClick={onUpdateExercise} className={change ? 'active' : ''}>{t("SAVE")}</Button>
      </div>
    </>
  )
})




//
// EDIT EXERCISE IMAGES
//
const EditImageSection = ({t, exercise, refetch, editImageMode, toggleEditImageMode}) => {

  const imageSrc = editImageMode == 1 ? '/start.png' : '/end.png';
  const {id: exerciseId, start_image, end_image, start_image_full_size, end_image_full_size} = exercise;

  //
  // Edit image handling
  //
  const [previewImage, setPreviewImage] = React.useState(null);
  const [loadingImage, setLoadingImage] = React.useState(false);

  const imageUrl = editImageMode == 1 ? start_image : end_image;
  const resetPreviewImage = () => {

    //console.log(resetPreviewImage);
    //console.log(exerciseId);
    //console.log(imageUrl);

    if( exerciseId && imageUrl && imageUrl.indexOf("lanista") == -1 ) {
      //console.log("creating new preview image")
      const cropRequest = {
        bucket: 'lanista-exercises',
        key: exerciseId + imageSrc,
      }
      const strRequest = JSON.stringify(cropRequest);
      const encRequest = btoa(strRequest);
      setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
    }

  };

  React.useEffect(() => {
    if( exercise ) {
      resetPreviewImage();
    }
  }, [exercise]);

  //
  // Crop image
  const onCropImage = (crop) => {
    if(crop) {
      setLoadingImage(true);
      const cropRequest = {
        bucket: 'lanista-exercises',
        key: exerciseId + imageSrc,
        edits: {
          extract: {
            height: Math.ceil(crop.height),
            width:Math.ceil(crop.width),
            top: Math.ceil(crop.y),
            left: Math.ceil(crop.x),
          }
        }
      }
      const strRequest = JSON.stringify(cropRequest);
      const encRequest = btoa(strRequest);
      setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
    }
  };

  //
  // Rotate image
  //
  const onRotateImage = (angle) => {
    setLoadingImage(true);
    const rotateRequest = {
      bucket: 'lanista-exercises',
      key: exerciseId+ imageSrc,
      edits: {
        rotate: angle,
      }
    }
    const strRequest = JSON.stringify(rotateRequest);
    const encRequest = btoa(strRequest);
    setPreviewImage("https://dn2ppfvx6tfpw.cloudfront.net/" + encRequest + '?DC=!' + (new Date()).getTime() );
  }

  React.useEffect(() => {
    setLoadingImage(false);
  }, [previewImage])


  //
  // image upload
  //
  const [uploadExerciseImageLoading, setUploadExerciseImageLoading] = React.useState(false);
  const [uploadExerciseImageError, setUploadExerciseImageError] = React.useState(null);
  const onUploadExerciseImage = (file) => {
    setLoadingImage(true);
    const exercisePosition = editImageMode == 1 ? 'start' : 'end';
    let reader = new FileReader();
    let uploadBaseUrl = document.location.protocol + '//' + document.location.host.replace('3000', '4000') + '/' + 'file/exercise/';
    if(file instanceof File) {
      reader.addEventListener('loadend', function(e){
        const token = cookie.get('token');
        fetch(uploadBaseUrl + exerciseId + '/' + exercisePosition, {
          method: "POST",
          body: new Blob([reader.result], {type: file.type}),
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          },
        })
        .then((response) => {
          console.log("UPLOAD COMPLETED")
          if (response.ok) {
            console.log("UPLOAD OK")
            refetch();
          } else {
            console.log("UPLOAD ERROR")
            alert('Error uploading [' + file.name + ']. Max upload size is ~4MB.');
          }
          setLoadingImage(false);
        })
        .catch((error) => {
          console.log("UPLOAD ERROR")
          console.log(error)
          setLoadingImage(false);
        });
      });
      reader.readAsArrayBuffer(file);
    } else {
      const token = cookie.get('token');
      fetch(uploadBaseUrl + exerciseId + '/' + exercisePosition + '/' + file.substring(file.lastIndexOf("/") + 1), {
        method: "POST",
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        },
      })
      .then((response) => {
        setUploadExerciseImageLoading(false);
        if (response.ok) {
          refetch();
        } else {
          alert('Error uploading [' + file.name + ']. Max upload size is ~4MB.');
        }
      })
      .catch((error) => {
        setUploadExerciseImageLoading(false);
      });
    }
  }

  const [paneWidth, setPaneWidth] = React.useState(0);

  React.useEffect(() => {
    var infoPane = document.getElementsByClassName("info-pane");
    var width = infoPane[0].clientWidth;
    setPaneWidth(width-114);
  }, []);

  return (
    <Tab.Pane className="info-pane">
      {paneWidth > 0 &&
        <ImageEditor
          t={t}
          imageSrc={editImageMode == 1 ? start_image_full_size : end_image_full_size}
          previewImage={previewImage}
          resetPreviewImage={resetPreviewImage}

          containerWidth={paneWidth}
          containerHeight={paneWidth}

          onUploadMemberImage={onUploadExerciseImage}
          onCropImage={onCropImage}
          onRotateImage={onRotateImage}
          loading={loadingImage}
        />
      }
    </Tab.Pane>
  );
}

//
//  EDIT VIDEO LINK SECTION
//
const EditVideoSection = withApollo(({t, exercise, refetch, editVideoMode, toggleEditVideoMode}) => {

  const {videoUrl, id} = exercise ? exercise : {};
  const [change, setChange] = React.useState(false);
  const [videoLink, setVideoLink] = React.useState(videoUrl);
  const pattern = /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be|youtube-nocookie.com)\/(watch|embed)?(\?v=|\/)?(\S+)?/;

  const [updateExerciseVideoLink, { loading: updateExerciseVideoLinkLoading, error: updateExerciseVideoLinkError }] = useMutation(
    UPDATEEXERCISEVIDEOLINK,
    {
      update(cache,  { data: { updateExerciseVideoLink } }) {
        updateExerciseVideoLink.id !== 0 && refetch();
      }
    }
  );

  const onUpdateExerciseVideoLink = () => {
    updateExerciseVideoLink({
      variables: {
        exerciseId: id,
        videoLink: videoLink,
      }
    })
  }

  React.useEffect(() => {
    setChange(false);
  }, [exercise]);

  React.useEffect(() => {
    setVideoLink(videoUrl);
  }, [videoUrl]);

  React.useEffect(() => {
    setChange( videoLink && videoLink !== videoUrl && pattern.test(videoLink) );
  }, [videoLink]);

  return (
    <div className="edit-video-section">
      <div className="title-section">{t("VIDEO_LINK")}</div>
      <div className="text-section">{t("ENTER_VIDEO_LINK")}</div>
      <div className="form-section">
        <FormControl fullWidth>
          <TextField
            id="standard-adornment-amount"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            InputProps={{
              startAdornment: (<YouTubeIcon/>),
            }}
            placeholder={'https://youtube.com/...'}
            autoFocus={true}
            variant="outlined"
          />
        </FormControl>
        <div className="error-message">{videoLink && !pattern.test(videoLink) && t("VIDEO_LINK_ERROR")}</div>
      </div>
      <div className="buttons-section">
        <Button variant="outlined" onClick={toggleEditVideoMode}>{t("CANCEL")}</Button>
        <Button variant="outlined" onClick={onUpdateExerciseVideoLink} className={change ? 'active' : ''}>{t("SAVE")}</Button>
      </div>
    </div>
  )
});




//
//  EDIT INDEXES SECTION
//
const EditIndexesSection = withApollo(({t, exerciseId, refetch, editIndexesMode, toggleEditIndexesMode}) => {

  const { loading, error, data:{exercise}, refetch: refetchEdit } = useQuery(EXERCISE_EDIT, {
    variables: {
      exerciseId: exerciseId,
    },
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  });

  const [updateExerciseIndexes, { loading: updateExerciseIndexesLoading, error: updateExerciseIndexesError }] = useMutation(
    UPDATEEXERCISEINDEXES,
    {
      update(cache,  { data: { updateExerciseIndexes } }) {
        if (updateExerciseIndexes.id !== 0){
          refetch();
          refetchEdit();
        }
      }
    }
  );

  const {exercise_type, muscle, addition, id} = exercise ? exercise : {};
  const [change, setChange] = React.useState(false);

  const [exerciseTypeValue, setExerciseTypeValue] = React.useState(exercise_type > 0 ? parseInt(exercise_type) : 0);
  const [muscleValue, setMuscleValue] = React.useState( muscle > 0 ? parseInt(muscle) : 0 );
  const [additionValue, setAdditionValue] = React.useState(addition > 0 ? parseInt(addition) : 0);

  const onUpdateExerciseIndexes = () => {
    updateExerciseIndexes({
      variables: {
        exerciseId: id,
        exerciseType: exerciseTypeValue,
        muscle: muscleValue,
        addition: additionValue
      }
    })
  }

  React.useEffect(() => {
    console.log("EXERCISE CHANGED")
    if( exercise ) {
      console.log("UPDATING...")
      const {exercise_type, muscle, addition} = exercise;
      setExerciseTypeValue(exercise_type > 0 ? parseInt(exercise_type) : 0);
      setMuscleValue(muscle > 0 ? parseInt(muscle) : 0);
      setAdditionValue(addition > 0 ? parseInt(addition) : 0);
    }
    setChange(false);
  }, [exercise]);

  React.useEffect(() => {
    console.log("INPUT VALUES CHANGED")

    console.log("exerciseTypeValue")
    console.log(exerciseTypeValue)
    console.log(exercise_type)

    console.log("muscleValue")
    console.log(muscleValue)
    console.log(muscle)

    console.log("additionValue")
    console.log(additionValue)
    console.log(addition)

    if( exercise ) {
      const {exercise_type, muscle, addition} = exercise;
      setChange( exerciseTypeValue !== parseInt(exercise_type) || muscleValue != parseInt(muscle) || additionValue != parseInt(addition) );
    }
  }, [exerciseTypeValue, muscleValue, additionValue]);

  return (
    <div className="edit-indexes-section">
      <div className="title-section">{t("INDEXES")}</div>
      <div className="text-section">{t("SET_INDEXES")}</div>
      <div className="form-section">
        <FormControl variant="outlined">
          <InputLabel id="index-exercise-type-select">{t("EXERCISE_TYPE")}</InputLabel>
          <Select
            labelId="index-exercise-type-select"
            id="index-exercise-type-select-outlined"
            value={exerciseTypeValue}
            onChange={(e) => setExerciseTypeValue(e.target.value)}
            label={t("EXERCISE_TYPE")}
          >
            <MenuItem value={0}>
              <em>{t("ALL_EXERCISE_TYPES")}</em>
            </MenuItem>
            <MenuItem value={1}>{t("machine")}</MenuItem>
            <MenuItem value={2}>{t("freeweights")}</MenuItem>
            <MenuItem value={3}>{t("cable")}</MenuItem>
            <MenuItem value={4}>{t("bodyweight")}</MenuItem>
            <MenuItem value={5}>{t("stretch")}</MenuItem>
            <MenuItem value={6}>{t("specials")}</MenuItem>
            <MenuItem value={7}>{t("cardio")}</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel id="index-muscle-select">{t("MUSCLE")}</InputLabel>
          <Select
            labelId="index-muscle-select"
            id="index-muscle-select-select-outlined"
            value={muscleValue}
            onChange={(e) => setMuscleValue(e.target.value)}
            label={t("MUSCLE")}
          >
            <MenuItem value={0}>
              <em>{t("ALL_MUSCLES")}</em>
            </MenuItem>
            <MenuItem value={1}>{t("chest")}</MenuItem>
            <MenuItem value={2}>{t("upperback")}</MenuItem>
            <MenuItem value={3}>{t("shoulder")}</MenuItem>
            <MenuItem value={4}>{t("frontfemoral")}</MenuItem>
            <MenuItem value={5}>{t("lowerback")}</MenuItem>
            <MenuItem value={6}>{t("hip")}</MenuItem>
            <MenuItem value={7}>{t("abs")}</MenuItem>
            <MenuItem value={8}>{t("biceps")}</MenuItem>
            <MenuItem value={9}>{t("triceps")}</MenuItem>
            <MenuItem value={10}>{t("forearm")}</MenuItem>
            <MenuItem value={11}>{t("lowerleg")}</MenuItem>
            <MenuItem value={14}>{t("lowerleg")}</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel id="index-additions-select">{t("ADDITION")}</InputLabel>
          <Select
            labelId="index-additions-select"
            id="index-additions-select-outlined"
            value={additionValue}
            onChange={(e) => setAdditionValue(e.target.value)}
            label={t("ADDITIONS")}
          >
            <MenuItem value={0}>
              <em>{t("ALL_ADDITIONS")}</em>
            </MenuItem>
            <MenuItem value={1}>{t("dumbbels")}</MenuItem>
            <MenuItem value={2}>{t("kettlebells")}</MenuItem>
            <MenuItem value={3}>{t("barbell")}</MenuItem>
            <MenuItem value={4}>{t("bank")}</MenuItem>
            <MenuItem value={5}>{t("others")}</MenuItem>
            <MenuItem value={6}>{t("ball")}</MenuItem>
            <MenuItem value={7}>{t("blast")}</MenuItem>
            <MenuItem value={8}>{t("jumber")}</MenuItem>
            <MenuItem value={9}>{t("foam")}</MenuItem>
            <MenuItem value={11}>{t("miniband")}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="buttons-section">
        <Button variant="outlined" onClick={toggleEditIndexesMode}>{t("CANCEL")}</Button>
        <Button variant="outlined" onClick={onUpdateExerciseIndexes} className={change ? 'active' : ''}>{t("SAVE")}</Button>
      </div>
    </div>
  )
});



//
// INFO SECTION
//
const InfoSection = ({t, exercise, owner, toggleEditMode, toggleEditIndexesMode}) => {

  const filterStyles={
    shoulder: {"fill":(exercise && exercise.muscle == "3" ? "red" : "rgb(151, 151, 151)"), "fillRule":"nonzero"},
    biceps: {"fill":(exercise && exercise.muscle == "8" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    triceps: {"fill":(exercise && exercise.muscle == "9" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    forearm: {"fill":(exercise && exercise.muscle == "10" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    chest: {"fill":(exercise && exercise.muscle == "1" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    upperback: {"fill":(exercise && exercise.muscle == "2" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    lowerback: {"fill":(exercise && exercise.muscle == "5" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    abs: {"fill":(exercise && exercise.muscle == "7" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    hip: {"fill":(exercise && exercise.muscle == "6" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    frontfemoral: {"fill":(exercise && exercise.muscle == "4" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    backfemoral: {"fill":(exercise && exercise.muscle == "4" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
    lowerleg: {"fill":(exercise && exercise.muscle == "11" ? "red" : "rgb(151, 151, 151)"),"fillRule":"nonzero"},
  }

  return (<>
    <div className="info-text">
      <div className="info-title">
        {t('EXECUTION')}
        {owner &&
          <IconButton
            aria-label="edit"
            className="edit-button"
            onClick={toggleEditMode}
          >
            <EditIcon fontSize="large" />
          </IconButton>
        }
      </div>
      {
        exercise.coaching_notes && exercise.coaching_notes.map((note) => (
          note.split('||').map(n =><div>{n}</div> )
        ))
      }
    </div>
    <div className="info-text">
      <div className="info-title">
        Mögliche Fehler
        {owner &&
          <IconButton
            aria-label="edit"
            className="edit-button"
            onClick={toggleEditMode}
          >
            <EditIcon fontSize="large" />
        </IconButton>}
      </div>
      {
        exercise.mistakes && exercise.mistakes.map((note) => (
          note.split('||').map(n =><div>{n}</div> )
        ))
      }
    </div>
    <div className="body-image-section">
      <BodyFilter
        filterStyles={filterStyles}
        onBodyPartSelection={() => {}}
      />
      {owner &&
        <IconButton
          aria-label="edit"
          className="edit-button"
          onClick={toggleEditIndexesMode}
        >
          <EditIcon fontSize="large" />
      </IconButton>}
    </div>
  </>)
}




//
// MAIN PANE CLASS
//
export default ({
  t,
  exercise,
  refetch,
  owner,

  editNameMode,
  toggleEditNameMode,

  editImageMode,
  toggleEditImageMode,

  editVideoMode,
  toggleEditVideoMode,

  editIndexesMode,
  toggleEditIndexesMode,

}) => {

  const [editMode, setEditMode] = React.useState();
  const toggleEditMode = () => setEditMode(!editMode);

  React.useEffect(() => {
    setEditMode(false);
    editImageMode > 0 && toggleEditImageMode();
    editNameMode && toggleEditNameMode();
    editVideoMode && toggleEditVideoMode();
    editIndexesMode && toggleEditIndexesMode();
  }, [owner])

  React.useEffect(() => {
    editNameMode && setEditMode(true);
    editNameMode && editImageMode > 0 && toggleEditImageMode();
    editNameMode && editVideoMode > 0 && toggleEditVideoMode();
    editNameMode && editIndexesMode > 0 && toggleEditIndexesMode();
  }, [editNameMode]);

  React.useEffect(() => {
    !editMode && editNameMode && toggleEditNameMode();
    editMode && editImageMode > 0 && toggleEditImageMode();
    editMode && editVideoMode > 0 && toggleEditVideoMode();
    editMode && editIndexesMode > 0 && toggleEditIndexesMode();
  }, [editMode]);

  React.useEffect(() => {
    editImageMode && setEditMode(false);
    editImageMode && editNameMode && toggleEditNameMode();
    editImageMode && editVideoMode > 0 && toggleEditVideoMode();
    editImageMode && editIndexesMode > 0 && toggleEditIndexesMode();
  }, [editImageMode]);

  React.useEffect(() => {
    editIndexesMode && setEditMode(false);
    editIndexesMode && editNameMode && toggleEditNameMode();
    editIndexesMode && editVideoMode > 0 && toggleEditVideoMode();
    editIndexesMode && editImageMode > 0 && toggleEditImageMode();
  }, [editIndexesMode]);

  return (
    <Tab.Pane className="info-pane">
      {
        !editMode && !editImageMode && !editVideoMode && !editIndexesMode &&
        <InfoSection
          t={t}
          exercise={exercise}
          owner={owner}
          toggleEditMode={toggleEditMode}
          toggleEditIndexesMode={toggleEditIndexesMode}
        />
      }
      {
        editMode &&
        <EditSection
          t={t}
          exerciseId={exercise.id}
          toggleEditMode={toggleEditMode}
          editNameMode={editNameMode}
          lang='DE'
        />
      }
      {
        editImageMode &&
        <EditImageSection
          t={t}
          exercise={exercise}
          refetch={refetch}
          toggleEditImageMode={toggleEditImageMode}
          editImageMode={editImageMode}
          lang='DE'
        />
      }
      {
        editVideoMode &&
        <EditVideoSection
          t={t}
          exercise={exercise}
          refetch={refetch}
          toggleEditVideoMode={toggleEditVideoMode}
          editVideoMode={editVideoMode}
        />
      }
      {
        editIndexesMode &&
        <EditIndexesSection
          t={t}
          exerciseId={exercise.id}
          refetch={refetch}
          toggleEditIndexesMode={toggleEditIndexesMode}
          editIndexesMode={editIndexesMode}
        />
      }
    </Tab.Pane>
  );

}
