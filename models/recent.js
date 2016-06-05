var mongoose = require('mongoose');

var RecentSchema = new mongoose.Schema({
  term: {
    type: String
  },
  when: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Recent', RecentSchema);
