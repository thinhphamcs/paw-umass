exports.register = (req, res) => {
    console.log(req.body);

    /**
     * Better way to write this 
     * const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        const passwordConfirm = req.body.passwordConfirm;
        const phone = req.body.phone;
     */
    const { firstName, lastName, email, password, passwordConfirm, phone } = req.body;


    res.send("Form Submitted");
}