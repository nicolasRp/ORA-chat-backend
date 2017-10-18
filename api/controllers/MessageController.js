/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    list: function(req, res) {


        Message.find().populate('user').then(function(messages) {

            if (!req.isSocket){
                Message.subscribe(req, _.pluck(messages, '_id'));         
            }
           
            
            return res.ok(messages);
        }).catch(function(err) {
            return res.negotiate(err);
        });
    }
};