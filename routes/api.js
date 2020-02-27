const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${req.user.accessToken}`
        }
    }
    res.json({type: 'success', message: 'You accessed the protected api routes'})
})

module.exports = router;