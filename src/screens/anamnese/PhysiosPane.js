import React, { useEffect, useState, useRef } from 'react';
import { Pane } from './styles';
import AnamneseList from './AnamneseList';
import Physio from './Physio';

export default ({
  t,

  id,

  physios,
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
    if( openFirst && physios ) {
      const index = physios.findIndex(f => f.id == openFirst);
      setSelection(index);
      setOpenFirst(undefined);
    }
  }, [physios]);

  const onSelection = (index) => {
    setSelection(index);
  }

  return <Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
    <AnamneseList
      data={physios}
      onSelection={onSelection}

      placeholder={t("physio input placeholder")}
      emptytext={t("physio emtpy list")}
      intensity={t("intensity")}

      onSave={onCreate}
      loading={createLoading || loading || deleteLoading || saveLoading}
      error={createError}
    />
  {
    selection >= 0 &&
    <Physio
      t={t}
      data={physios[selection]}
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
