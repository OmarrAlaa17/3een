import classes from './style/Form.module.css';
import React, { useRef } from "react";
import { useSelector} from 'react-redux'
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'



function Formfunc () {
    const form = useRef();
    const Data=  useSelector(state => state);
    const [recieved, setrecieved]=useState(false);
    const [mssg1,setmssg1]=useState();
    const [mssg2,setmssg2]=useState();
    useEffect (()=>{
        const ms=Data.map(b=>`Product Name : ${b.name}, count:${b.count} `)
        console.log(JSON.stringify(ms))
        let mm1 = ms[0];
        setmssg1(mm1);

        if (ms.length==2)
        {
            let mm2 = ms[1];
            setmssg2(mm2);
        }
    },[]);

    const handleSubmit = (data) =>  {
        console.log("GGG");
        var d = {
            service_id: 'service_miwlgjy',
            template_id: 'template_fkd0794',
            user_id: 'caEQMdIpf0TPTEgac',
        };
var  template_params= {
    message1: mssg1,
    message2: mssg2
}
template_params.name =data.name;
template_params.Address =data.Address;
template_params.Email =data.Email;
template_params.PromoCode =data.PromoCode;
template_params.Social_Account =data.Social_Account;
d.template_params=template_params;
console.log(d);
        axios.post('https://api.emailjs.com/api/v1.0/email/send',d).then(res=>{})
      }

const initialValues = {
    name: "",
    Address: "",
    Email: "",
    Social_Account: "",
    PromoCode: ""
}

const schema = Yup.object().shape({
    name: Yup.string().min(3).required('Name filed is required'),
    Email: Yup.string().min(3).email('Invalid email address').required(" Email field is required"),
    Address: Yup.string().required("Address field is required"),
    Social_Account: Yup.string().min(3).required('Social Account filed is required'),
    PromoCode: Yup.string().min(3) 
})

    
    return (
        <div>
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            <Form className={classes.shape} >
                <div className={classes.userbox}>
                    <Field className={classes.input} type="text" name="name" required=" " />
                    <label className={classes.label}>Username</label>
                    <ErrorMessage className={classes.Err} name='name' component='span'/>
                </div>
                <div className={classes.userbox}>
                    <Field type="text" name="Address" required=" " className={classes.input}/>
                    <label className={classes.label}>Address</label>
                    <ErrorMessage className={classes.Err} name='Address' component='span'/>
                </div>
                <div className={classes.userbox}>
                    <Field type="text" name="Email" required=" " className={classes.input}/>
                    <label className={classes.label}>E-mail</label>
                    <ErrorMessage className={classes.Err} name='Email' component='span'/>
                </div>
                <div className={classes.userbox}>
                    <Field type="text" name="Social_Account" required=" " className={classes.input}/>
                    <label className={classes.label}>Instagram/Facebook</label>
                    <ErrorMessage className={classes.Err} name='Social_Account' component='span'/>
                </div>
                <div className={classes.userbox}>
                    <Field type="text" name="PromoCode" required=" " className={classes.input}/>
                    <label className={classes.label}>Promocode</label>
                    <ErrorMessage className={classes.Err} name='PromoCode' component='span'/>
                </div>
                    <div>
                        <button type="submit">
                            Send
                        </button>
                    </div>
                </Form>          
        </Formik>

            <div className={classes.recieve}>
            {recieved ? <p style={{fontSize:20}}>Thank you! <br/> Order sent successfully</p>:null}
            </div>
        </div>
    );
}

export default Formfunc;