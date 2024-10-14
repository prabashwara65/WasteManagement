import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import adminRoute from './routes/admin/adminRoutes.js'
import binRoute from './routes/bin/binRoutes.js'
import wasteCollectionRouter from './routes/collections/wasteCollectionRoutes.js'
import dotenv from 'dotenv';
dotenv.config();


const app = express()
app.use(cors())
app.use(express.json())

app.use('/auth' , authRouter )
app.use('/admins', adminRoute)
app.use('/bins', binRoute)
app.use('/wasteCollections', wasteCollectionRouter)



app.listen(process.env.PORT, () => {
    console.log("server is running")
})
