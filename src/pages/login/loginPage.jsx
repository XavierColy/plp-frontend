import './login.css';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import bcrypt from 'bcryptjs';
import cred from './credentials.txt';


export default function LoginPage() {
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

    const login = async (identifiant, password) => {
        const creds = await getCreds();
        if (identifiant === creds.id) {
            const match = await bcrypt.compare(password, creds.passwd);
            if (match) {
                localStorage.setItem("ALLOWED", "true");
                navigate('/overview');
            } else {

            }
        }
    }


    return (
        <div id={"login_page"}>
            <div id={"login_form"}>
                <h1>Superv'INSA</h1>
                <form className={"card"} onSubmit={handleSubmit(async (data) => {
                    await login(data.id.trim(), data.passwd.trim());
                })}>
                    {/*region Login input*/}
                    <div>
                        <div className={"input-div"}>
                            <input className={"card " + (errors.login && "input-invalid")} placeholder="Identifiant"
                                   id="login" {...register("id", {
                                required: true,
                                minLength: 4
                            })}/>
                        </div>
                        {/*{errors.login && handleLoginError()}*/}
                    </div>
                    {/*endregion*/}

                    {/* region Password input*/}
                    <div>
                        <div className={"input-div"}>
                            <input className={"card " + (errors.passwd && "input-invalid")} placeholder="Mot de passe"
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