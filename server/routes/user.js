const mongoose = require('mongoose');
const middleware = require('../middleware');
const User = mongoose.model('User');
const passport = require('passport');

/*
    NOTE: Delete is not supported due to a risk of having inconsistencies in data.
    Use attribute 'active' to flag if the account is active or deleted (inactive).
    Alternatively, create another attribute to differentiate between temporarily inactive and permanently deleted.
*/
module.exports = app => {
    /*              Authentication              */

    // Returns the logged in user, or `null` if not logged in.
    app.get('/api/auth/whoami', (req, res) => {
        const user = req.isAuthenticated() ? req.user : null;
        return res.status(200).send({ user });
    });

    // TODO: sort out a nicer way to write this with promises
    app.post('/api/auth/register', (req, res) =>
        User.register(
            new User({
                username: req.body.email,
                publicName: req.body.username,
            }),
            req.body.password
        )
            .then(user => {
                // Authenticate the user after registration.
                req.login(user, err => console.log({ err }));

                // Send the created user object to the client.
                return res.status(201).send({
                    error: false,
                    user,
                });
            })
            .catch(err => {
                res.status(500).send(Object.keys(err).includes("message") ? err.message : err)
            })
    );

    // POST - Log in
    // Error messages are received in different formats in different scenarios, which was causing errors in client.
    // For example when connection cannot be established or when user credentials are wrong
    // Therefore needed to create a custom method
    app.post('/api/auth/login', (req, res) => {
        console.log(res)
        passport.authenticate('local', (err, user, response) => {
            if (err) {
                res.status(500).send(err)
            }
            else if (!user) {
                res.status(401).send(response.message)
            }
            else {
                res.status(200).send({
                    error: false,
                    user,
                })
            }
        })(req, res)
    });

    // Log Out
    app.post('/api/auth/logout', (req, res) => {
        let user = req.user;
        req.logout();
        return res.status(200).send({
            error: false,
            user,
        });
    });

    // TODO: below temporarily commented as it requires a proper middleware
    /*              Users               */
    // TODO add middleware or reuse that method inside the login method, do not expose freely in the available api
    // // INDEX - note that the path is /users not /auth
    // app.get(`/api/users`, async (req, res) => {
    //     User.find({})
    //         .then(users => res.status(200).send(users))
    //         .catch(err => res.status(500).send({ err }));
    // });

    // // UPDATE 
    // app.put('/api/users/:id', middleware.isUser, async (req, res) => {
    //     const { id } = req.params;
    //     const user = {
    //         ...req.body,
    //         edited: Date.now(),
    //     };

    //     User.findByIdAndUpdate(id, user)
    //         .then(user => {
    //             res.status(200).send({ error: false, user });
    //         })
    //         .catch(err => res.status(500).send({ err }));
    // });

    // DELETE is not supported. 
    // When user decides to delete the account -> set the value of attribute "active" to false 
};