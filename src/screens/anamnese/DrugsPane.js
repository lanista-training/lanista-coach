import React, { useEffect, useState, useRef } from 'react';
import { Pane } from './styles';
import AnamneseList from './AnamneseList';
import Drug from './Drug';

export default ({
  t,

  id,

  drugs,
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
    if( openFirst && drugs ) {
      const index = drugs.findIndex(f => f.id == openFirst);
      setSelection(index);
      setOpenFirst(undefined);
    }
  }, [drugs]);

  const onSelection = (index) => {
    setSelection(index);
  }

  return <Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
    <AnamneseList
      data={drugs}
      onSelection={onSelection}

      placeholder={t("drugs input placeholder")}
      emptytext={t("drugs emtpy list")}
      intensity={t("dosification")}

      onSave={onCreate}
      loading={createLoading || loading || deleteLoading || saveLoading}
      error={createError}
    />
  {
    selection >= 0 &&
    <Drug
      t={t}
      data={drugs[selection]}
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
