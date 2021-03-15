import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { apis } from "../../apis";
import apirequest from "../../library/apirequest";
import ls from 'local-storage';
import { Page, Form, Button, Card, Layout, TextField, Label } from '@shopify/polaris';

export default function SignInForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [errors, setErrors] = useState('');
    const handleEmailChange = useCallback(value => setEmail(value), []);
    const handlePasswordChange = useCallback(value => setPassword(value), []);


    const handleSubmit = (evt) => {
        evt.preventDefault();
        apirequest(apis.customer.login, {
            token: false,
            body: { 'email': email, 'password': password },
            sCall: function (result) {
                ls.set('token', result['data']['token']);

                if (result.status == 'SUCCESS') {
                    history.push('/admin/dashboard');
                    setErrors("");
                }
            },
            fCall: function (error) {
                setErrors("wrong Credentials");
            }
        });
    }

    return <Page>
        <Layout>
            <Layout.Section oneThird>
                <Card></Card>
            </Layout.Section>
            <Layout.Section oneThird >
                <Card title="Admin Login">
                    <Card.Section>
                        <Form onSubmit={handleSubmit} noValidate={false}>
                            <TextField aria-required type="email" label="Email" value={email} onChange={handleEmailChange} />
                            <br></br>
                            <TextField type="password" label="Password" value={password} onChange={handlePasswordChange} />
                            <span style={{ color: 'red', display: 'block', width: '100%', textAlign:'center' }}>{errors}</span>
                            <br></br>
                            <br></br>
                            <Button submit fullWidth>Login</Button>
                        </Form>
                    </Card.Section>
                </Card>
            </Layout.Section>
            <Layout.Section oneThird>
                <Card></Card>
            </Layout.Section>
        </Layout></Page>
}