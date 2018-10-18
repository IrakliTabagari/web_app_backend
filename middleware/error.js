function error(err, req, res, next){
    res.status(500).send('Internal Server Error - Something failed.'+err);
}

module.exports = error;