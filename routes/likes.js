const express=require('express');
const router=express.Router();
const likesController= require('../controllers/liks_controller')


router.post('/toggle',likesController.toggleLike);

module.exports=router;