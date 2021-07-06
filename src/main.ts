import { NestFactory } from "@nestjs/core"
import { getRepository } from "typeorm";
import { AppModule } from "./app.module";
import { PORT } from "./common/config";
import * as bcrypt from "bcrypt";
import User from "./entity/user.entity";
import { INestApplication } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { NestExpressApplication } from "@nestjs/platform-express";

const start = async () => {
    try {
        let app: INestApplication
        if(process.env.USE_FASTIFY === 'false') {
            app = await NestFactory.create<NestFastifyApplication>(
                AppModule,
                new FastifyAdapter()
            )
        } else {
            app = await NestFactory.create<NestExpressApplication>(AppModule)
        }

        const userRep = getRepository(User)
        const user = await userRep.findOne({login: `admin`})
        if(!user) {
            const userAdmin = userRep.create({
                name: 'admin',
                login: 'admin',
                password: bcrypt.hashSync('admin', 8)
            })
            console.log('Create user "Admin"');
            
            await userRep.save(userAdmin)
        }
        
        await app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))
    } catch(e) {
        console.log(e);  
    }
}

start()