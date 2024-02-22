import './login.css';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import bcrypt from 'bcryptjs';
import cred from './credentials.txt';


export default function ChangePasswd() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'});
    const navigate = useNavigate();

    const getCreds = async () => {
        return fetch(cred)
            .then(r => r.text())
            .then(text => {
                const res = text.split(" ");
                return {
                    id: res[0],
                    passwd: res[1]
                }
            });
    }

    const change = async (previous, password) => {
        const creds = await getCreds();
        const match = await bcrypt.compare(previous, creds.passwd);
        if (match) {
            const hash = bcrypt.hash(password,14);
            // wfp('./bab/credentiales.txt',`admin ${hash}`,()=>{});
        }
    }


    return (
        <div id={"login_page"}>
            <div id={"login_form"}>
                <h1>Superv'INSA</h1>
                <form className={"card"} onSubmit={handleSubmit(async (data) => {
                    await change(data.previous.trim(), data.passwd.trim());
                })}>
                    {/*region Login input*/}
                    <div>
                        <div className={"input-div"}>
                            <input type={'password'} className={"card " + (errors.login && "input-invalid")}
                                   placeholder="Ancien mot de passe"
                                   id="login" {...register("previous", {
                                required: true,
                                minLength: 4,
                                maxLength: 60
                            })}/>
                        </div>
                        {/*{errors.login && handleLoginError()}*/}
                    </div>
                    {/*endregion*/}

                    {/* region Password input*/}
                    <div>
                        <div className={"input-div"}>
                            <input className={"card " + (errors.passwd && "input-invalid")}
                                   placeholder="Nouveau mot de passe"
                                   id="passwd" type="password" {...register("passwd", {
                                required: true,
                                minLength: 4,
                                maxLength: 60
                            })}/>
                        </div>
                        {/*{errors.passwd && <div className="inputError">{t('LOGIN.PASSWD_ERROR')}</div>}*/}
                    </div>
                    {/*endregion*/}

                    <button type={'submit'}> Se connecter</button>
                </form>
            </div>
        </div>
    );
}