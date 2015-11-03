var map = {
  'ab49fd20': {
    key_1: 'key'
  },
  '9822df87': {
    another_key: 'big data',
    yet_another_key: 'small data'
  },
  default: '<nothing>'
};

/**
 * Interpolates strings and matches content with keys
 */
module.exports = function(str) {
    
    str = (str && str.constructor === String)? str : '';
   	
    // Subsequent validation not needed as loop will never enter if '.' doesn't exist
    (str.match(/\{+[a-f0-9]*.*?\}+/g) || []).forEach(function(match) {
      var search = (match.match(/[a-f0-9]*\.+[^\}\s]*/g) || [])[0],
          segments = search && search.split('.'),
          text = (map && map[segments[0]] && map[segments[0]][segments[1]]) || map.default;
      
      str = str.replace(match, text, 'g');
    });	
    
    return str;
};