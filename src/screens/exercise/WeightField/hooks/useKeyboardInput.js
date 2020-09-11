import { useEffect, useState, useRef } from 'react';

export default function useKeyboardInput(initialValue, validKeys = []) {
  const [value, setValue] = useState(initialValue);
  const refValue = useRef(initialValue);
  const refValidKeys = useRef(validKeys);
  const [keyDownEvent, setKeyDownEvent] = useState(null);

  useEffect(() => {
    setKeyDownEvent(
      null
    ); /** Necessary to avoid computation of useEffect on initalValue change when event is old --> see test of '-' sign */
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    refValue.current = value;
  }, [value]);

  useEffect(() => {
    refValidKeys.current = validKeys;
  }, [validKeys]);

  function keyDownHandler(event, complement) {
    const { key } = event;
    setKeyDownEvent(event);
    if (key === 'Backspace') {
      setValue(refValue.current.slice(0, -1));
    } else if (refValidKeys.current.length > 0) {
      if( complement && complement > 0 ) {
        if( key == '>') {
          setValue( parseFloat(refValue.current) + complement + '' )
        } else if( key == '<' ){
          console.log("MARK")
          console.log(refValue.current)
          const newValue = parseFloat(refValue.current) - complement;
          console.log(newValue)
          console.log(newValue > 0 ? (newValue + '') : '0')
          setValue( newValue > 0 ? (newValue + '') : '0' )
        }
      } else if (refValidKeys.current.includes(key)) {
        setValue(refValue.current + key);
      }
    }
  }

  function virtualInteraction(key, increment) {
    keyDownHandler(new KeyboardEvent('keydown', { key }), increment);
  }
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return function cleanup() {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return { value, keyDownEvent, virtualInteraction };
}
