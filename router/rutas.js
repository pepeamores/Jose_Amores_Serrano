const express=require('express');
const router=express.Router();

router.get('/', (req,res)=>{
    res.render("inicio",{
        titulo:"titulo dinamico"
    })
})

module.exports = router;