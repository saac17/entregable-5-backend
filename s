[1mdiff --git a/requests/conversations.rest b/requests/conversations.rest[m
[1mindex 34beae2..2e99481 100644[m
[1m--- a/requests/conversations.rest[m
[1m+++ b/requests/conversations.rest[m
[36m@@ -7,15 +7,17 @@[m [mGET {{rootRoute}}[m
 Authorization: JWT {{token}}[m
 [m
 [m
[31m-# @name createConversation[m
[32m+[m
 ### Crear una conversacion - AUTHENTICATION REQUIRED -[m
 POST {{rootRoute}}[m
[32m+[m[32mContent-Type: application/json[m
 Authorization: JWT {{token}}[m
 [m
 {[m
[31m-    "title" : "conversacion Elena G - Maria Vega", [m
[31m-    "initParticipants" : "{219c5876-9b9b-4df0-8fa0-2ca94d03d1e5}" [m
[31m-    }[m
[32m+[m[32m  "title": "Melisa Monica y Pedro",[m
[32m+[m[32m  "initParticipants": "{fb154aeb-aca8-4a04-ab96-7d7a4e73e944, ae55a7ef-0f33-4726-b3d8-da9458e55896}",[m
[32m+[m[32m  "imageUrl": "example/url"[m
[32m+[m[32m}[m
 [m
 [m
 [m
[1mdiff --git a/src/conversations/conversations.controllers.js b/src/conversations/conversations.controllers.js[m
[1mindex 335de59..05f4ed7 100644[m
[1m--- a/src/conversations/conversations.controllers.js[m
[1m+++ b/src/conversations/conversations.controllers.js[m
[36m@@ -27,16 +27,11 @@[m [mconst findAllConversations = async (userId) => {[m
 }[m
 [m
 const createConversation = async (obj) => {[m
[31m-    console.log(obj.title)[m
[31m-    console.log(obj.userId)[m
[31m-    console.log(obj.initParticipants)[m
[31m-    console.log(obj.imageUrl)[m
     const data = await Conversations.create({[m
         id: uuid.v4(),[m
         title: obj.title,[m
         userId : obj.userId,[m
         imageUrl: obj.imageUrl,[m
[31m-        // initParticipants: obj.initParticipants[m
         initParticipants: sequelize.literal(`'${obj.initParticipants}'`)[m
     })[m
     // await Participants.create({[m
[36m@@ -54,4 +49,6 @@[m [mconst createConversation = async (obj) => {[m
 module.exports = {[m
     findAllConversations,[m
     createConversation[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
[41m+[m
[41m+[m
