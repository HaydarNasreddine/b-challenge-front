import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { apis } from "../../apis";
import apirequest from "../../library/apirequest";
import ls from 'local-storage';
import { Page, Form, Button, Card, Layout, TextField, Label, Banner } from '@shopify/polaris';

export default function SignUpForm() {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const history = useHistory();
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState(0);
    const handleEmailChange = useCallback(value => setEmail(value), []);
    const handleFirstNameChange = useCallback(value => setFirstName(value), []);
    const handleLastNameChange = useCallback(value => setLastName(value), []);
    const handlePasswordConfChange = useCallback(value => setPasswordConf(value), []);
    const handlePasswordChange = useCallback(value => setPassword(value), []);

    const handleLoginButton = () => { history.push('/') }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        apirequest(apis.customer.register, {
            token: false,
            body: { 'email': email, 'password': password, 'password_confirmation': passwordConf, 'first_name': firstName, 'last_name': lastName },
            sCall: function (result) {
                console.log(result)
                setSuccess(1)
                setErrors({})
            },
            fCall: function (error) {
                setErrors(error.errors)
                setSuccess(0)
            }
        });
    }

    const handleSigninClick = (value) => {
        history.push('/')
    }
    function Banner1() {
        return success ? <Banner
            title="Your account is successfully created !"
            status="success"
            action={{ content: 'Login ->', onAction: handleLoginButton }}
        /> : ''
    }

    return <Page>
        <Banner1 />
        <br></br>
        <Layout>
            <Layout.Section oneThird>
                <Card></Card>
            </Layout.Section>
            <Layout.Section oneThird >
                <Card title="Customer Registration">
                    <Card.Section>
                        <Form onSubmit={handleSubmit} noValidate={false}>
                            <TextField aria-required type="text" label="First Name" value={firstName} onChange={handleFirstNameChange} />
                            <span style={{ color: 'red', display: 'block', width: '100%', textAlign: 'center' }}>{errors.first_name}</span>
                            <br></br>
                            <TextField aria-required type="text" label="Last Name" value={lastName} onChange={handleLastNameChange} />
                            <span style={{ color: 'red', display: 'block', width: '100%', textAlign: 'center' }}>{errors.last_name}</span>
                            <br></br>
                            <TextField aria-required type="email" label="Email" value={email} onChange={handleEmailChange} />
                            <span style={{ color: 'red', display: 'block', width: '100%', textAlign: 'center' }}>{errors.email}</span>
                            <br></br>
                            <TextField type="password" label="Password" value={password} onChange={handlePasswordChange} />
                            <span style={{ color: 'red', display: 'block', width: '100%', textAlign: 'center' }}>{errors.password}</span>
                            <br></br>
                            <TextField type="password" label="Confirm Password" value={passwordConf} onChange={handlePasswordConfChange} />
                            <br></br>
                            <Button submit fullWidth>Login</Button>
                            <br></br>
                            {/* <a style={{width:'100%', display: 'block', textAlign: 'center'}} onClick={handleSigninClick} href="/signup">Already have an account ? Login</a> */}

                        </Form>
                    </Card.Section>
                </Card>
            </Layout.Section>
            <Layout.Section oneThird>
                <Card></Card>
            </Layout.Section>
        </Layout></Page>
}