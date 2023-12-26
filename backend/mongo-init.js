db.createUser({
    user: "user",
    pwd: "password",
    roles: [
        {
            role: "readWrite",
            db: "db",
        },
    ],
});

db.createCollection("users");
