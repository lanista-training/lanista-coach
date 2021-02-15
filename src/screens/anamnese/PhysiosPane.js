import React, { useEffect, useState, useRef } from 'react';
import { Pane } from './styles';
import PhysioList from './PhysioList';
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

  const [selection, setSelection] = useState(null);
  const [openFirst, setOpenFirst] = useState(id);

  useEffect(() => {
    if( openFirst && physios ) {
      const index = physios.findIndex(f => f.id == openFirst);
      setSelection(physios[index]);
      setOpenFirst(undefined);
    }
  }, [physios]);

  const onSelection = (item) => {
    setSelection(item);
  }

  return <Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
    <PhysioList
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
    selection &&
    <Physio
      t={t}
      data={selection}
      open={true}
      onClose={() => setSelection(null)}

      onSave={onSave}
      onDelete={onDelete}
      loading={loading ||createLoading || saveLoading || deleteLoading}
      error={saveError}
    />
  }
  </Pane>
}
