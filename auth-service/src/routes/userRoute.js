import { authHandler } from "../hooks/user-auth.js";

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
    })
}

export default userRouter;