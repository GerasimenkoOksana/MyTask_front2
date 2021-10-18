import React, {useCallback, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const AuthPage = () =>{
    const message = useMessage()
    const {loading, error, request} = useHttp()
    const[form, setForm] = useState({
        email:'',
        password:''
        })
    const [errorsForm, setErrorsForm] = useState({errorsForm:null})

    useEffect(() =>{
        message(errorsForm)
        setErrorsForm(null)
    },[errorsForm, message])


    const checkForm = () =>{
        const reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const rePassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/
        if (!reEmail.test(String(form["email"]).toLowerCase()) || ! rePassword.test(form["password"])){
            setErrorsForm("uncorrect email or password")
        }
    }
    const changeForm = event =>{
        setForm({...form, [event.target.name]:event.target.value})
        console.log('form:', form)
    }
    const registerHandler = async () =>{
        checkForm()
        try{
            const data = await request('http://localhost:3030/api/auth/register', 'POST', {...form})
            console.log('data:', data)
        }catch (e){}
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorisation</span>
                        <div>
                            <div className="input-field">
                                <input className="yellow-input" placeholder="enter e-mail" id="email" name="email" type="email" onChange={changeForm}/>
                            </div>
                            <div className="input-field">
                                <input className="yellow-input" placeholder="enter password" id="password" name="password" type="password" onChange={changeForm} />
                            </div>
                        </div>
                    </div>
                    <div className="card-action container">
                        <button className="btn yellow darken-4 btnAuth" disabled={loading}>Log in</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Registr</button>
                    </div>
                </div>
            </div>

        </div>
    )

}