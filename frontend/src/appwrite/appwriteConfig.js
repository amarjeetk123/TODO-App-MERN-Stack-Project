import { Client , Account , Databases } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost:100/v1").setProject("63878aa462a836e7ffcd")

export const account = new Account(client)

// Database

export const database = new Databases(client , "63878acd841f54d431b4")