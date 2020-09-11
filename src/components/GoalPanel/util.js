import {Input} from 'semantic-ui-react';

export const getTargetName = (type) => {
  switch (type) {
    case 1:
      return 'Gewicht'
      break;
    case 2:
      return 'Entfernung'
      break;
    case 3:
      return 'Körperumfang'
      break;
    case 4:
      return 'Schmerzlinderung'
      break;
    case 5:
      return 'Körperfett'
      break;
    case 6:
      return 'Herzfrequenz'
      break;
    default:
      return 'Frei wählbar'
      break;
  }
}

export const getTargetUnit = (type) => {
  switch (type) {
    case 1:
      return 'Kg'
      break;
    case 2:
      return 'Km'
      break;
    case 3:
      return 'mm'
      break;
    case 4:
      return ''
      break;
    case 5:
      return '%'
      break;
    case 6:
      return 'Schläge/Min'
      break;
    default:
      return ''
      break;
  }
}

export const getCurrentValue = (member, type) => {
  const {weight} = member
  switch (type) {
    case 1:
      return <div className="current-value">{weight} Kg</div>
      break;
    case 2:
      return <div className="current-value">{weight} Kg</div>
      break;
    case 3:
      return <div className="current-value">{weight} Kg</div>
      break;
    case 4:
      return <div className="current-value">{weight} Kg</div>
      break;
    case 5:
      return <div className="current-value">{weight} Kg</div>
      break;
    case 6:
      return <div className="current-value">{weight} Kg</div>
      break;
    default:
      return <div className="current-value">{0}</div>
      break;
  }
}

export const getTargetInputField = (type, value, setValue) => {
  switch (type) {
    case 1:
      return <Input
        label={{ basic: true, content: 'kg' }}
        labelPosition='right'
        placeholder='Enter weight...'
        onChange={(e, {value}) => setValue(value)}
        value={value > 0 ? value : null}
        type='number'
      />
      break;
    case 2:
      return <Input
        label={{ basic: true, content: 'km' }}
        labelPosition='right'
        placeholder='Enter weight...'
      />
      break;
    case 3:
      return <Input
        label={{ basic: true, content: 'mm' }}
        labelPosition='right'
        placeholder='Enter weight...'
      />
      break;
    case 4:
      return <><Input list='target' placeholder='Schmerzgrad...' />
        <datalist id='target'>
          <option value='Hoch' />
          <option value='Medium' />
          <option value='Niedrig' />
        </datalist></>
      break;
    case 5:
      return <Input
        label={{ basic: true, content: 'Schlägen pro Minute' }}
        labelPosition='right'
        placeholder='Enter weight...'
      />
      break;
    case 6:
      return <Input
        label={{ basic: true, content: 'Schlägen pro Minute' }}
        labelPosition='right'
        placeholder='Enter weight...'
      />
      break;
    default:
      return <><Input placeholder='Zielwert' /><Input placeholder='Einheit' /></>
      break;
  }
}
