const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
       callback(null,'./documents') 
    },
    filename:(req,file,callback)=>{
        const filename=`resume-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const fileFilter=(req,file,callback)=>{
    if(file.mimetype===`application/pdf` || file.mimetype===`image/jpeg` || file.mimetype===`image/jpg` || file.mimetype===`image/png` ){
        callback(null,true)

    }else{
        callback(null,false)
        return callback(new Error('only  pdf files are allowed'))
    }
}

const multerconfig=multer({
    storage,
    fileFilter ,
    limits: {
        fileSize: 5 * 1024 * 1024 
    } 
})

module.exports=multerconfig
