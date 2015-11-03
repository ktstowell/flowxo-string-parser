var vows = require('vows');
var assert = require('assert');
var interpolate = require('..');
var suite = vows.describe('Parser');

// Test strings
var strings = {
  first: 'This is a string with a valid {{ ab49fd20.key_1 }}',
  second: 'This is a string with an invalid key (should show <nothing>) {{ ab49fd20.key_5555 }}.',
  third: null
};

suite
  .addBatch({
    'When interpolating a string with a valid key... ': {
      topic: function() {
        return interpolate(strings.first);
      },
      'we should see the correct value in place': function(str) {
        assert.notEqual(str, '');
        assert.equal(str.match(/\{\{[a-f0-9]*.*?\}\}/g), null);
      }
    },
    'When interpolating a string with an invalid key...': {
      topic: function() {
        return interpolate(strings.second);
      },
      'we should see the string <nothing> in its place': function(str) {
        assert.notEqual(str, '');
        assert.notEqual(str.match(/\<nothing\>/g), null); 
      }
    },
    'When interpolating a non-string value...': {
      topic: function() {
        return interpolate(strings.third);
      },
      'an empty string should be returned': function(str) {
        assert.equal('', str);
      }
    }
  }).export(module);