import { authHandler } from "../hooks/user-auth.js";
import fastifyMultipart from '@fastify/multipart';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';

const createUserSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },

  response: {
    201: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
  },
};

async function userRouter(fastify, opts) {

    // register fastify multipart
    fastify.register(fastifyMultipart, {
      limits: {
        fieldNameSize: 100, // Max field name size in bytes
        fieldSize: 100,     // Max field value size in bytes
        fields: 10,         // Max number of non-file fields
        fileSize: 1000000,  // For multipart forms, the max file size in bytes
        files: 1,           // Max number of file fields
        headerPairs: 2000,  // Max number of header key=>value pairs
        parts: 1000         // For multipart forms, the max number of parts (fields + files)
      }
    });

    // implementing middlewares
    // fastify.addHook('preHandler', authHandler);

    fastify.post('/api/users', { schema: createUserSchema }, async (req, rep) => {
        // get request body
        const {name, email, password} = req.body;

        // get mongo db collection
        const userCollection = fastify.mongo.db.collection('users');
        const result = await userCollection.insertOne({ name, email, password });

        console.log("Result:", result);
        
        const insertedId = result.insertedId;
        fastify.log.info(`user created: ${insertedId}`);

        // get request body
        // console.log(req.body);

        // validate request
        rep.code(201);
        return {
            id: insertedId,
            message: "User created!!",
        };
    });

    fastify.get("/api/users", async (req, rep) => {
        const {q} = req.query;
        console.log("query", req.query);
        
        // get collection
        const userCollection = fastify.mongo.db.collection('users');

        let query = {};
        if(q){
            query = {
                name: {$regex: q, $options: 'i'} // i for case insensitivity
            }
        }
        const allUsers = await userCollection.find(query).toArray();
        fastify.log.info("User list fetched!!")

        return allUsers;
    })

    fastify.get("/api/users/:id", { preHandler: authHandler }, async (req, rep) => {
      console.log("from user handler...", req.userToken);
      const Id = new fastify.mongo.ObjectId(req.params.id);

      // get collection
      const userCollection = fastify.mongo.db.collection('users');

      const singleUser = await userCollection.findOne({_id: Id});
      return singleUser;
    });

    fastify.post("/api/upload", async (req, rep) => {
      const data = await req.file();
      // console.log(data);

      // const filePath = path.join(uploadDir, data.filename);

      await pipeline(data.file, fs.createWriteStream(`static/${data.filename}`));
      rep.send();
    });
}

export default userRouter;