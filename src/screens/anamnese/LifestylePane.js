import React, { useEffect, useState, useRef } from 'react';
import { Pane } from './styles';
import AnamneseList from './AnamneseList';
import Lifestyle from './Lifestyle';

export default ({
  t,

  id,

  lifestyles,
  loading,

  onCreateLifestyle,
  createLifestyleLoading,
  createLifestyleError,

  onSaveLifestyle,
  saveLifestyleLoading,
  saveLifestyleError,

  onDeleteLifestyle,
  deleteLifestyleLoading,
  deleteLifestyleError,
}) => {
  const [selection, setSelection] = useState(-1);

  const [openFirst, setOpenFirst] = useState(id);
  useEffect(() => {
    if( openFirst && lifestyles ) {
      const index = lifestyles.findIndex(f => f.id == openFirst);
      setSelection(index);
      setOpenFirst(undefined);
    }
  }, [lifestyles]);

  const onSelection = (index) => {
    setSelection(index);
  }

  return <Pane style={{ height: "calc((100vh - 130px) - 7em)" }}>
    <AnamneseList
      data={lifestyles}
      onSelection={onSelection}

      placeholder={t("ailment input placeholder")}
      emptytext={t("ailment emtpy list")}
      intensity={t("intensity")}

      onSave={onCreateLifestyle}
      loading={createLifestyleLoading || loading || deleteLifestyleLoading || saveLifestyleLoading}
      error={createLifestyleError}
    />
  {
    selection >= 0 &&
    <Lifestyle
      t={t}
      data={lifestyles[selection]}
      open={true}
      onClose={() => setSelection(-1)}

      onSave={onSaveLifestyle}
      onDelete={onDeleteLifestyle}
      loading={loading || createLifestyleLoading || saveLifestyleLoading || deleteLifestyleLoading}
      error={saveLifestyleError}
    />
  }
  </Pane>
}
