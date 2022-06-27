const router = require('express').Router();
const apiRoutes = require('./api');

router.get('/api', apiRoutes);

router.get('/', (req, res) => {
    return res.redirect('api/notes')
});

router.use((req, res) => {
    res.send('Wrong Route!')
});

module.exports = router;