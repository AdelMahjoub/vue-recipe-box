export function capitalize(value) {
  if(!Boolean(value) || (typeof value !== 'string')) {
    return value;
  }
  return value.toLowerCase().split(' ').map(word => {
    return word[0].toUpperCase().concat(word.slice(1));
  }).join(' ');
}

export function shorten(value) {
  if(!Boolean(value) || (typeof value !== 'string')) {
    return value;
  }
  if(value.length >= 40) {
    return `${value.slice(0, 40)} ...`
  }
  return value;
}

export function propToLabel(prop) {
  switch(prop) {
    case 'name':
    return 'Recipe name';
    case 'img':
    return 'Main image';
    case 'quantity':
    return 'Amount';
    case 'unit':
    return 'Unit';
    case 'description':
    return 'Description';
    default:
    return 'label';
  }
}

export function propToPlaceHolder(prop) {
  switch(prop) {
    case 'name':
    return 'Name';
    case 'img':
    return 'http://example.com/image.png';
    case 'quantity':
    return 'Amount';
    case 'unit':
    return 'Unit of measurement';
    case 'description':
    return 'Cooking tips, special notes ...'
  }
}

export function propToRequired(prop) {
  switch(prop) {
    case 'name':
    return true;
    case 'img':
    return false;
    case 'quantity':
    return true;
    case 'unit':
    return true;
    case 'description':
    return false;
    default:
  }
}