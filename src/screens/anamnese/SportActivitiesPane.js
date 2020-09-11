import React, { useEffect, useState, useRef } from 'react';
import { Pane } from './styles';
import AnamneseList from './AnamneseList';
import SportActivity from './SportActivity';

export default ({
  t,

  id,

  sportActivities,
  loading,

  onCreate,
  createLoading,
  createError,

  onSave,
  saveLoading,
  saveError,

  onDelete,
  deleteLoading,
  deleteError,
}) => {

  const [selection, setSelection] = useState(-1);

  const [openFirst, setOpenFirst] = useState(id);
  useEffect(() => {
    if( openFirst && sportActivities ) {
      const index = sportActivities.findIndex(f => f.id == openFirst);
      setSelection(index);
      setOpenFirst(undefined);
    }
  }, [sportActivities]);

  const onSelection = (index) => {
    setSelection(index);
  }

  return <Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
    <AnamneseList
      data={sportActivities}
      onSelection={onSelection}

      placeholder={t("sport activities input placeholder")}
      emptytext={t("sport activities emtpy list")}
      intensity={t("frequency")}

      onSave={onCreate}
      loading={createLoading || loading || deleteLoading || saveLoading}
      error={createError}
    />
  {
    selection >= 0 &&
    <SportActivity
      t={t}
      data={sportActivities[selection]}
      open={true}
      onClose={() => setSelection(-1)}

      onSave={onSave}
      onDelete={onDelete}
      loading={loading ||createLoading || saveLoading || deleteLoading}
      error={saveError}
    />
  }
  </Pane>
}
