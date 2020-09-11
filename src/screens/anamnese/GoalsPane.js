import React, { useEffect, useState, useRef } from 'react';
import { Pane } from './styles';
import AnamneseList from './AnamneseList';
import Goal from './Goal';

export default ({
  t,

  id,

  goals,
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
    if( openFirst && goals ) {
      const index = goals.findIndex(f => f.id == openFirst);
      setSelection(index);
      setOpenFirst(undefined);
    }
  }, [goals]);

  const onSelection = (index) => {
    setSelection(index);
  }

  return <Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
    <AnamneseList
      data={goals}
      onSelection={onSelection}

      placeholder={t("goals input placeholder")}
      emptytext={t("goals emtpy list")}
      intensity={t("Priorität")}

      onSave={onCreate}
      loading={createLoading || loading || deleteLoading || saveLoading}
      error={createError}
    />
  {
    selection >= 0 &&
    <Goal
      t={t}
      data={goals[selection]}
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
