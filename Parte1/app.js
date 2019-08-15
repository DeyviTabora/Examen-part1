var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var Schema = mongoose.Schema;
var app = express();
app.use(bodyparser());

mongoose.connect("mongodb://localhost/Examen",{ useNewUrlParser: true });

var songSchemaJSON = {
    SongTitle:String,
    ArtistName:String,
    GenreName:Date,
};

var song_schema = new Schema(songSchemaJSON);
var Song = mongoose.model("Song",song_schema);

app.post("/v1/search",function(req, res){
    var song = new User({
        SongTitle: req.body.SongTitle,
        ArtistName: req.body.ArtistName,
        GenreName: req.body.GenreName,
    });

    song.save(function(){
        console.log(song);
    });

    res.send(song);
});

app.get("/Songs",function(req, res){
    Song.find(function (err, songs) {
        if (err) return console.error(err);
        console.log(songs);
      })
      res.send(Song);
});

app.listen(8080, () => {
    console.log('server on port 8080');
});