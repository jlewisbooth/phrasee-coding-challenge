import React, { useCallback } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import { logIn } from '../actions/index';

const emailValidator = new RegExp(/^([a-zA-Z0-9_]+)@([a-zA-Z0-9_]{1,128})\.([a-zA-Z]{2,6})$/);
const passwordValidator = new RegExp(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,128}$/);

const LogInForm = (props) => {
    const [form] = Form.useForm();

    // if our validation process applied on the form components has succeeded, 
    // we move on to dispatching our request and waiting for authentication
    const attemptLogIn = useCallback(async () => {
        try {
          let validatedFields = await form.validateFields();
    
          props.dispatch(logIn(validatedFields));
    
        } catch (error) {
          console.error("ERROR", error);
        }
    }, [form]);

    return (
        <div className='form-wrapper'>
            <Form
            layout={'vertical'}
            name="basic"
            initialValues={{ remember: true }}
            form={form}
            >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                () => ({
                    validator(_, value) {
                    if(emailValidator.test(value)) {
                        return Promise.resolve();
                    }
                    
                    return Promise.reject(new Error(`Email has incorrect format. Please make sure there is a maximum of 128 characters between the '@' and the '.'. Please make sure there's a max of 6 characters after the '.'.`));
                    },
                }),
                ]}
            >
                <Input
                size="large"
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                () => ({
                    validator(_, value) {
                    if(passwordValidator.test(value)) {
                        return Promise.resolve();
                    }
                    
                    return Promise.reject(new Error(`Password has incorrect format. It must be alphanumeric, a minimum of 8 characters, a maximum of 128 characters, and at lease one number and one capital letter.`));
                    },
                }),
                ]}
            >
                <Input.Password
                size="large"
                />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button
                type="primary"
                htmlType="submit"
                size="large"
                onClick={() => attemptLogIn()}
                loading={props.loggingIn}
                >
                Log in
                </Button>
            </Form.Item>
            </Form>
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
      loggingIn: state.fetchingAuthentication,
      errorMessage: state.errorMessage
    }
}
  
  export default connect(mapStateToProps)(LogInForm)